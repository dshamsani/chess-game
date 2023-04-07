import { FC } from "react";
import { Cell } from "../../models/Cell";
import styles from "../../styles/Layout.module.scss";
import Image from "next/image";

interface ICellComponent {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<ICellComponent> = ({ cell, selected, click }) => {
  return (
    <div
      className={`w-[64px] h-[64px] flex justify-center items-center ${cell.color === "white" ? styles.white : styles.black} ${
        selected ? styles.selected : ""
      } `}
      onClick={() => click(cell)}
      style={{ background: cell.available && cell.figure ? "#69628e" : "" }}
    >
      {cell.available && !cell.figure && <div className={styles.available} />}
      {cell.figure?.logo && (
        <Image src={cell.figure.logo} alt="figure" className="w-[48px] h-[48px] relative [user-select:_none;]" draggable={false} />
      )}
    </div>
  );
};

export default CellComponent;
