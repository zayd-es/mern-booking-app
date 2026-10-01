import { useNavigate } from "react-router-dom";
import { roomsDummyData } from "../../../assets/assets";
import Title from "../../common/Title";
import HotelCard from "./_components/HotelCard";

const FeaturedDestination = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center my-16 lg:px-24 md:px-16 sm:px-8 px-4">
      {/* 1. Section Title */}
      <Title
        title="Featured Destination"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      {/* 2. Cards Grid (4 items max) */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-12 w-full">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

      {/* 3. Center Aligned Button */}
      <div className="flex justify-center w-full">
        <button
          onClick={() => {
            navigate("/rooms");
            scrollTo(0, 0);
          }}
          className="my-12 px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer shadow-sm"
        >
          View All Destinations
        </button>
      </div>
    </section>
  );
};

export default FeaturedDestination;
