import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import React, { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
  const {
    featuredSong,
    fetchMadeForYouSong,
    fetchTrendingSong,
    isLoading,
    fetchFeaturedSong,
    madeForYouSong,
    trendingSong,
  } = useMusicStore();

  const { initializePlayer } = usePlayerStore();
  useEffect(() => {
    fetchMadeForYouSong();
    fetchTrendingSong();
    fetchFeaturedSong();
  }, [fetchMadeForYouSong, fetchTrendingSong, fetchFeaturedSong]);

  useEffect(() => {
    if (
      madeForYouSong.length > 0 &&
      featuredSong.length > 0 &&
      trendingSong.length > 0
    ) {
      const allSong = [...madeForYouSong, ...trendingSong, ...featuredSong];
      initializePlayer(allSong);
    }
  }, [initializePlayer, madeForYouSong, trendingSong, featuredSong]);
  return (
    <>
      <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-900 to-zinc-800">
        <Topbar />

        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-semibold mb-6 sm:text-3xl">
              Good Afternoon
            </h1>
            <FeaturedSection />
          </div>
          <div className="space-y-8">
            <SectionGrid
              title="Made for you"
              songs={madeForYouSong}
              isLoading={isLoading}
            />

            <SectionGrid
              title="Trending"
              songs={trendingSong}
              isLoading={isLoading}
            />
          </div>
        </ScrollArea>
      </main>
    </>
  );
};

export default HomePage;
