import Image, { type StaticImageData } from "next/image";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface RecommendationCardProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  title: string;
  src: string | StaticImageData;
  alt: string;
  imageClassName?: string;
}

export function RecommendationCard({
  href,
  title,
  src,
  alt,
  imageClassName,
  className,
  ...props
}: RecommendationCardProps) {
  return (
    <a
      className={cn("max-w-full cursor-pointer", className)}
      href={href}
      title={title}
      {...props}
    >
      <div className="flex h-[120.26px] w-[310px] max-w-full items-center justify-center overflow-hidden rounded-2xl border bg-white p-2 shadow-[20px_19px_50px_0px_#0057BC26]">
        <Image className={imageClassName} height={100} src={src} alt={alt} />
      </div>
    </a>
  );
}
