interface CapabilitiesCardProps {
  heading: string;
  text: string;
  icon: React.ReactNode;
}

function CapabilitiesCard({ heading, icon, text }: CapabilitiesCardProps) {
  return (
    <section className="lg:min-w-[430px] lg:max-w-[430px]  w-full  h-[200px] border-gray-300 border-[1px] rounded-lg px-5 py-3 shadow-md mx-2 my-5">
      {icon}
      <h1 className="font-semibold md:text-2xl text-xl my-2 mb-10">
        {heading}
      </h1>
      <p>{text}</p>
    </section>
  );
}

export default CapabilitiesCard;
