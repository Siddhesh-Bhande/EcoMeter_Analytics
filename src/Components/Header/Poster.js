import HomePgImg from "../../assets/homeposter.jpg";
import HomePgLgImg from "../../assets/homeposter_lg.jpg";

export default function Poster() {
  return (
    <div className="w-full h-full">
      <img className="object-fill w-full md:hidden" src={HomePgImg}></img>
      <img
        className="object-fill w-full md:block hidden"
        src={HomePgLgImg}
      ></img>
    </div>
  );
}
