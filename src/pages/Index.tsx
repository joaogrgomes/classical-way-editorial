import SiteHeader from "@/components/SiteHeader";
import HeroBanner from "@/components/HeroBanner";
import Masthead from "@/components/Masthead";
import FrontpageHero from "@/components/FrontpageHero";
import ArticlesSection from "@/components/ArticlesSection";
import FeaturedPodcast from "@/components/FeaturedPodcast";
import PodcastSection from "@/components/PodcastSection";
import EssaysSection from "@/components/EssaysSection";
import QuoteBand from "@/components/QuoteBand";
import NewsletterBanner from "@/components/NewsletterBanner";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Masthead />
      <FrontpageHero />
      <ArticlesSection />
      <FeaturedPodcast />
      <PodcastSection />
      <EssaysSection />
      <QuoteBand />
      <HeroBanner />
      <NewsletterBanner />
      <SiteFooter />
    </div>
  );
};

export default Index;
