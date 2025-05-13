import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import React, { useEffect, useState } from "react";
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

  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon");
    } else if (hour >= 18 && hour < 22) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);
  return (
    <>
      <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-900 to-zinc-800">
        <Topbar />

        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-semibold mb-6 sm:text-3xl">
              {greeting}
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
