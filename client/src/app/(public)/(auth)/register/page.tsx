import RegisterForm from "@/components/modules/Auth/RegisterForm";


export default function RegisterPage() {
  return (
    <section className="relative min-h-screen  bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_40%,_transparent_100%)] opacity-30 animate-fade-glow-once"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 mt-15">
        <RegisterForm></RegisterForm>
      </div>
    </section>
  );
}
