import Image from "next/image";
import styles from "./BannerMiddle.module.css";

export default function BannerMiddle() {
  return (
    <div className={styles.bannerMiddleContainer}>
      <Image src="/assets/images/banner.jpg" alt="Banner" width={1000} height={1000} />
    </div>
  )
}