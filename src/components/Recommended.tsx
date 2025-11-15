import { HTMLAttributes } from "react";
import LogoLaurego from "../../public/laurego-logo.png";
import LogoMalnuku from "../../public/malanuku-logo.png";
import LogoPodProgiem from "../../public/podprogiem-logo.png";
import LogoCitytaste from "../../public/citytaste-logo.jpg";
import { RecommendationCard } from "./ui/recommendation-card";

const Recommended = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={className}>
      <h3 className="mb-6 text-center text-2xl leading-[29.05px] font-extrabold text-[#0F365C] md:text-[32px] md:leading-[38.73px]">
        Polecane strony
      </h3>
      <div className="mt-4 grid w-full grid-cols-2 items-center justify-center gap-4 px-6">
        <RecommendationCard
          href="https://laurego.pl?utm_source=kdr&utm_medium=recommendation"
          title="Laurego - Jawność płac w Twojej firmie"
          src={LogoLaurego}
          alt="laurego logo"
        />
        <RecommendationCard
          href="https://citytaste.pl?utm_source=kdr&utm_medium=recommendation"
          title="CityTaste - Jedzenie i Podróże"
          src={LogoCitytaste}
          alt="citytaste logo"
        />
        <RecommendationCard
          href="https://podprogiem.pl?utm_source=kdr&utm_medium=recommendation"
          title="Portal muzyczny PodProgiem"
          src={LogoPodProgiem}
          alt="podprogiem logo"
        />
        <RecommendationCard
          href="https://malanuku.pl?utm_source=kdr&utm_medium=recommendation"
          title="Portal o aranżacji wnętrz"
          src={LogoMalnuku}
          alt="malanuku logo"
        />
      </div>
    </div>
  );
};

export default Recommended;
