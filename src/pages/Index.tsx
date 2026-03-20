import SiteHeader from "@/components/SiteHeader";
import Masthead from "@/components/Masthead";
import FrontpageHero from "@/components/FrontpageHero";
import ArticlesSection from "@/components/ArticlesSection";
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
      <PodcastSection />
      <EssaysSection />
      <QuoteBand />
      <NewsletterBanner />
      <SiteFooter />
    </div>
  );
};

export default Index;
