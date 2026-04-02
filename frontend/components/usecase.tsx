import { usecases } from "@/app/data.json";

export default function Usecase() {
  return (
    <section className="mt-6 w-full max-w-6xl">
      <div className="bg-card flex flex-col gap-4 rounded-md p-4">
        <h2 className="text-lg font-bold">How it Works</h2>
        <p className="text-md text-center">
          Our advanced AI technology provides enterprise-grade real-time
          translation for seamless global collaboration. Deploy it securely
          across your organization to break language barriers in all your
          virtual communications.
        </p>
      </div>
      <div className="mt-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        {usecases.map(({ title, description, cta }, idx) => (
          <div
            key={idx}
            className="bg-card flex h-92 max-w-xs min-w-86 flex-col items-center justify-center rounded-md p-6"
          >
            <div className="flex flex-1 flex-col justify-between gap-4">
              <div className="min-h-40 rounded-md bg-white" />
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">{title}</h1>
                <p className="text-sm">{description}</p>
              </div>
              <a className="mt-2 mr-auto text-sm font-semibold text-blue-700 hover:cursor-pointer">
                {cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
