"use client";

import type {
  GeoJSONSource,
  Map as MapLibreMap,
  Marker as MapLibreMarker,
} from "maplibre-gl";
import { useEffect, useRef, useState } from "react";

export type LocationPlace = {
  id: string;
  name: string;
  category:
    | "Adventure"
    | "Beaches"
    | "Culture"
    | "Food"
    | "Nature"
    | "Nightlife"
    | "Stay";
  kind: string;
  lat: number;
  lng: number;
  parish: string | null;
  address: string | null;
  website: string | null;
  phone: string | null;
  openingHours: string | null;
  cuisine: string | null;
  description: string | null;
  wheelchair: string | null;
  fee: string | null;
  osmUrl: string;
};

type DiscoveryMapProps = {
  places: LocationPlace[];
  selectedPlace: LocationPlace | null;
  onSelect: (place: LocationPlace) => void;
};

function toGeoJson(places: LocationPlace[]) {
  return {
    type: "FeatureCollection" as const,
    features: places.map((place) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [place.lng, place.lat],
      },
      properties: {
        id: place.id,
        name: place.name,
        category: place.category,
      },
    })),
  };
}

export function DiscoveryMap({
  places,
  selectedPlace,
  onSelect,
}: DiscoveryMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<MapLibreMarker | null>(null);
  const placesRef = useRef(places);
  const onSelectRef = useRef(onSelect);
  const moduleRef = useRef<typeof import("maplibre-gl") | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    placesRef.current = places;
  }, [places]);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      if (!containerRef.current || mapRef.current) return;

      try {
        const maplibregl = await import("maplibre-gl");
        if (cancelled || !containerRef.current) return;
        moduleRef.current = maplibregl;

        const map = new maplibregl.Map({
          container: containerRef.current,
          style: "https://tiles.openfreemap.org/styles/liberty",
          center: [-77.31, 18.15],
          zoom: 7.25,
          minZoom: 6.5,
          maxZoom: 16,
          attributionControl: false,
        });

        map.addControl(
          new maplibregl.NavigationControl({ showCompass: false }),
          "top-right",
        );
        map.addControl(
          new maplibregl.AttributionControl({
            compact: true,
            customAttribution:
              '<a href="https://openfreemap.org/" target="_blank" rel="noreferrer">OpenFreeMap</a>',
          }),
          "bottom-right",
        );

        map.on("load", () => {
          map.addSource("go-bjoun-places", {
            type: "geojson",
            data: toGeoJson(placesRef.current),
            cluster: true,
            clusterMaxZoom: 11,
            clusterRadius: 46,
          });

          map.addLayer({
            id: "place-clusters",
            type: "circle",
            source: "go-bjoun-places",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": "#075d78",
              "circle-radius": [
                "step",
                ["get", "point_count"],
                19,
                20,
                24,
                50,
                30,
              ],
              "circle-stroke-color": "#fffdf9",
              "circle-stroke-width": 3,
            },
          });

          map.addLayer({
            id: "place-cluster-count",
            type: "symbol",
            source: "go-bjoun-places",
            filter: ["has", "point_count"],
            layout: {
              "text-field": ["get", "point_count_abbreviated"],
              "text-size": 11,
              "text-font": ["Noto Sans Regular"],
            },
            paint: {
              "text-color": "#ffffff",
            },
          });

          map.addLayer({
            id: "places-unclustered",
            type: "circle",
            source: "go-bjoun-places",
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": [
                "match",
                ["get", "category"],
                "Beaches",
                "#168caa",
                "Nature",
                "#1c755f",
                "Food",
                "#ed7652",
                "Nightlife",
                "#7b5aa6",
                "Culture",
                "#aa7435",
                "Stay",
                "#365f83",
                "#075d78",
              ],
              "circle-radius": 8,
              "circle-stroke-color": "#fffdf9",
              "circle-stroke-width": 2.5,
            },
          });

          map.on("click", "places-unclustered", (event) => {
            const feature = event.features?.[0];
            const id = feature?.properties?.id;
            const place = placesRef.current.find((item) => item.id === id);
            if (place) onSelectRef.current(place);
          });

          map.on("click", "place-clusters", async (event) => {
            const feature = event.features?.[0];
            const clusterId = Number(feature?.properties?.cluster_id);
            const coordinates = (
              feature?.geometry as { coordinates?: number[] } | undefined
            )?.coordinates;
            const source = map.getSource("go-bjoun-places") as GeoJSONSource;
            if (!source || !coordinates || Number.isNaN(clusterId)) return;
            const zoom = await source.getClusterExpansionZoom(clusterId);
            map.easeTo({
              center: coordinates as [number, number],
              zoom,
              duration: 500,
            });
          });

          for (const layerId of ["places-unclustered", "place-clusters"]) {
            map.on("mouseenter", layerId, () => {
              map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", layerId, () => {
              map.getCanvas().style.cursor = "";
            });
          }

          setReady(true);
        });

        map.on("error", (event) => {
          if (!event.error?.message?.includes("Failed to fetch")) return;
          setFailed(true);
        });

        mapRef.current = map;
      } catch {
        setFailed(true);
      }
    }

    initialize();

    return () => {
      cancelled = true;
      markerRef.current?.remove();
      markerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const source = mapRef.current?.getSource("go-bjoun-places") as
      | GeoJSONSource
      | undefined;
    source?.setData(toGeoJson(places));
  }, [places]);

  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = moduleRef.current;
    markerRef.current?.remove();
    markerRef.current = null;
    if (!map || !maplibregl || !selectedPlace) return;

    const markerElement = document.createElement("div");
    markerElement.className = "map-selected-marker";
    markerElement.setAttribute("aria-hidden", "true");
    markerRef.current = new maplibregl.Marker({ element: markerElement })
      .setLngLat([selectedPlace.lng, selectedPlace.lat])
      .addTo(map);

    map.flyTo({
      center: [selectedPlace.lng, selectedPlace.lat],
      zoom: Math.max(map.getZoom(), 11.5),
      duration: 700,
      essential: true,
    });
  }, [selectedPlace]);

  return (
    <div className="real-map-wrap">
      <div
        ref={containerRef}
        className="real-map"
        aria-label={`Interactive map showing ${places.length} Jamaican places`}
      />
      {!ready && !failed && (
        <div className="map-status" role="status">
          <span className="map-loading-dot" />
          Loading Jamaica
        </div>
      )}
      {failed && (
        <div className="map-status map-failed">
          <strong>The map is taking a break.</strong>
          <span>Switch to List to browse every place.</span>
        </div>
      )}
    </div>
  );
}
