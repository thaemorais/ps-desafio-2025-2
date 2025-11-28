import Image from "next/image";
import styles from "./BannerMiddle.module.css";

export default function BannerMiddle({ urlImage }: { urlImage: string }) {
  return (
    <div className={styles.bannerMiddleContainer}>
      <Image src={urlImage} alt="Banner" width={1000} height={1000} />
    </div>
  )
}