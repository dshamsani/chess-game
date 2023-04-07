import { FC } from "react";
import { Figure } from "../../models/figures/Figure";
import Image from "next/image";
import styles from "../../styles/Layout.module.scss";

interface ILostFigures {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<ILostFigures> = ({ title, figures }) => {
  return (
    <div className={styles.lost}>
      <h3>{title}</h3>
      <div className="flex flex-wrap max-w-[100px]">
        {figures.map((figure) => {
          return (
            <div key={figure.id}>
              {figure.logo && <Image src={figure.logo} alt="" width={20} height={20} className="[user-select:_none;]" draggable={false} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LostFigures;
