import Image from "next/image";
import { HTMLAttributes } from "react";
import LogoMalnuku from "../../public/malanuku-logo.png";
import LogoPodProgiem from "../../public/podprogiem-logo.png";

const Recommended = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={className}>
      <h3 className="text-center text-[32px] font-extrabold leading-[38.73px] text-[#0F365C]">
        Polecane strony
      </h3>
      <div className="mt-4 flex w-full justify-center gap-4">
        <a
          className="cursor-pointer"
          href="https://podprogiem.pl?utm_source=kdr&utm_medium=recommendation"
          title="Portal muzyczny PodProgiem"
        >
          <div className="flex h-[120.26px] w-[310px] items-center justify-center rounded-2xl border bg-white p-2 shadow-[20px_19px_50px_0px_#0057BC26]">
            <Image height={100} src={LogoPodProgiem} alt="podprogiem logo" />
          </div>
        </a>
        <a
          className="cursor-pointer"
          href="https://malanuku.pl?utm_source=kdr&utm_medium=recommendation"
          title="Portal o aranżacji wnętrz"
        >
          <div className="flex h-[120.26px] w-[310px] items-center justify-center rounded-2xl border bg-white p-2 shadow-[20px_19px_50px_0px_#0057BC26]">
            <Image height={100} src={LogoMalnuku} alt="malanuku logo" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Recommended;
