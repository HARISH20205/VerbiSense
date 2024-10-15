interface EnhancementCardProps {
  heading: string;
  text: string;
  icon: React.ReactNode;
}

function EnhancementCard({ heading, icon, text }: EnhancementCardProps) {
  return (
    <section className="lg:flex-1 border-gray-300 border-[1px] max-lg:w-full rounded-lg px-5 py-6 shadow-md mx-2 my-5">
      {icon}
      <h1 className="font-semibold md:text-2xl text-xl my-2 mb-10">
        {heading}
      </h1>
      <p className="text-[15px]">{text}</p>
    </section>
  );
}

export default EnhancementCard;
