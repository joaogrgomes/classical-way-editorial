import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import HeroBanner from "@/components/HeroBanner";
import Masthead from "@/components/Masthead";
import FrontpageHero from "@/components/FrontpageHero";
import ArticlesSection from "@/components/ArticlesSection";
import FeaturedPodcast from "@/components/FeaturedPodcast";
import PodcastSection from "@/components/PodcastSection";
import EssaysSection from "@/components/EssaysSection";
import BookReviewSection from "@/components/BookReviewSection";
import QuoteBand from "@/components/QuoteBand";
import NewsletterBanner from "@/components/NewsletterBanner";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="The Classical Way — Educação Cristã Clássica"
        description="Formando mentes e almas para a glória de Deus através da herança viva da educação cristã clássica. Artigos, podcasts e recursos para educadores e famílias."
        canonical="https://theclassicalway.com.br/"
        ogType="website"
      />
      <SiteHeader />
      <Masthead />
      <FrontpageHero />
      <ArticlesSection />
      <FeaturedPodcast />
      <PodcastSection />
      <EssaysSection />
      <BookReviewSection />
      <QuoteBand />
      <HeroBanner />
      <NewsletterBanner />
      <SiteFooter />
    </div>
  );
};

export default Index;
