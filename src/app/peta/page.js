import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PetaApp from "@/components/peta/PetaApp";

export const metadata = {
  title: "Peta",
  description: "Peta ekonomi kreatif, pariwisata, dan fasilitas umum Kalurahan Banaran.",
};

export default function PetaPage() {
  return (
    <div className="flex flex-1 flex-col font-serif">
      <Header compact />
      <PetaApp />
      <Footer flush />
    </div>
  );
}
