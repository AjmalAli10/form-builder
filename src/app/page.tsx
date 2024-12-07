import FormBuilder from "@/components/form-builder";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto flex items-center justify-center md:px-20">
      <main className="w-full bg-white border-x border-[#E1E4E8] h-screen relative">
        <FormBuilder />
      </main>
    </div>
  );
}
