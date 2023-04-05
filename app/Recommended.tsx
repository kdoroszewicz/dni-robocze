import Image from "next/image";
import LogoMalnuku from "../public/malanuku-logo.png";
import LogoPodProgiem from "../public/podprogiem-logo.png";

const Recommended = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Polecane strony</h3>
      <div className="mt-4 grid w-full grid-cols-2 grid-rows-1 gap-6">
        <a
          className="cursor-pointer"
          href="https://podprogiem.pl?utm_source=kdr&utm_medium=recommendation"
          title="Portal muzyczny PodProgiem"
        >
          <div className="flex h-full w-full items-center justify-center rounded-lg border bg-white p-2 shadow-sm">
            <Image height={100} src={LogoPodProgiem} alt="podprogiem logo" />
          </div>
        </a>
        <a
          className="cursor-pointer"
          href="https://malanuku.pl?utm_source=kdr&utm_medium=recommendation"
          title="Portal o aranżacji wnętrz"
        >
          <div className="flex h-full w-full items-center justify-center rounded-lg border bg-white p-2 shadow-sm">
            <Image height={100} src={LogoMalnuku} alt="malanuku logo" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Recommended;
