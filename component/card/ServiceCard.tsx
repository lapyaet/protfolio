import React from "react";

type props = {
  title: string;
  dec: string;
};

const ServiceCard = ({ title, dec }: props) => {
  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-center">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <p className="text-base font-medium">{dec}</p>
    </div>
  );
};

export default ServiceCard;
