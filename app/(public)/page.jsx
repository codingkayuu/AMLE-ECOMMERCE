'use client'
import { useAuth } from "@/context/AuthContext";
import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import WelcomeHero from "@/components/WelcomeHero";
import Newsletter from "@/components/Newsletter";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";

export default function Home() {
    const { user } = useAuth();

    return (
        <div>
            {user ? <WelcomeHero user={user} /> : <Hero />}
            <LatestProducts />
            <BestSelling />
            <OurSpecs />
            <Newsletter />
        </div>
    );
}
