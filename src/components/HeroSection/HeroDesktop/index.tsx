import { ImageDisplay } from "@components/HeroSection/HeroDesktop/ImageDisplay";
import { NextBtn, PrevBtn } from "@components/HeroSection/components/Controls";
import { useCurrent } from "@components/HeroSection/hooks/useCurrent";
import { useData } from "@components/HeroSection/hooks/useData";
export function HeroDesktop({}) {
  const data = useData();
  if (!data || data.length <= 0) return null;
  return (
    <section className="size-full p-2 grid md:grid-cols-[60%_1fr] lg:grid-cols-2 grid-rows-[100%] gap-2 max-w-screen overflow-scroll  group">
      <ImageDisplay />
      <aside className=" flex flex-col ">
        <Body />
        <div className="flex justify-between mx-auto w-2/5 mt-auto mb-10">
          <PrevBtn className="hover:scale-110 transition-transform duration-200 focus:scale-100" />
          <NextBtn className="hover:scale-110 transition-transform duration-200 focus:scale-100" />
        </div>
      </aside>
    </section>
  );
}
function Body() {
  const [{ description, title }] = useCurrent();
  return (
    <main>
      <h2 className="text-center font-bold text-2xl text-accent">{title}</h2>
      <p className="w-[60ch] mx-auto">{description}</p>
    </main>
  );
}
