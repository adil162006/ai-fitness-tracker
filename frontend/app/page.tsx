"use client"
import React, { useEffect } from 'react';
import { 
  Bolt, 
  Cpu, 
  PlayCircle, 
  Dumbbell, 
  Zap, 
  HeartPulse, 
  BarChart3, 
  Apple, 
  Users, 
  Check, 
  Share2, 
  Mail, 
  Globe, 
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';  
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';


// --- Scroll Reveal Wrapper ---
const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
        hidden: { opacity: 0, y: 30 }
      }}
    >
      {children}
    </motion.div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bolt className="text-white w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">AI Fitness Tracker</h2>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
          <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-all active:scale-95" onClick={()=>router.push("/auth/signup")}>
            Sign in
          </button>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-6 flex flex-col gap-4">
          <a href="#features" className="text-sm font-medium text-gray-600" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-600" onClick={() => setIsOpen(false)}>How it Works</a>
          <a href="#testimonials" className="text-sm font-medium text-gray-600" onClick={() => setIsOpen(false)}>Testimonials</a>
        </div>
      )}
    </nav>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; color: string }> = ({ icon, title, desc, color }) => (
  <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className={`size-12 rounded-xl flex items-center justify-center mb-6 ${color}`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const StepCard: React.FC<{ step: number; title: string; desc: string }> = ({ step, title, desc }) => (
  <div className="relative flex-1 text-center group">
    <div className="size-16 bg-white border border-gray-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 text-2xl font-bold shadow-md z-10 relative">
      {step}
    </div>
    <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed px-4">{desc}</p>
  </div>
);

const TestimonialCard: React.FC<{ img: string; name: string; role: string; quote: string }> = ({ img, name, role, quote }) => (
  <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
    <div className="flex items-center gap-4 mb-6">
      <img src={img} alt={name} className="size-12 rounded-full object-cover border-2 border-white shadow-sm" />
      <div>
        <h4 className="font-bold text-gray-900">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
    <p className="text-gray-600 leading-relaxed italic">&quot;{quote}&quot;</p>
  </div>
);

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden hero-mesh">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-8 tracking-wide">
              <Cpu className="w-4 h-4" /> Powered by Advanced GPT-4o
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight max-w-4xl text-gray-900">
              Your Personal <span className="gradient-text">AI Fitness Coach</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
              Unlock your true potential with data-driven recovery and highly personalized plans. Experience the future of fitness with AI-powered precision.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 mb-24">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-green-500/10 transition-all active:scale-95" onClick={()=>router.push("/auth/signup")}>
                Get Started
              </button>
              <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 px-8 py-4 rounded-full text-lg font-semibold text-gray-900 transition-all active:scale-95">
                <PlayCircle className="w-6 h-6" /> Watch Demo
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="relative w-full max-w-5xl mx-auto group">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px]"></div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-green-400/10 rounded-full blur-[100px]"></div>
              <div className="bg-white rounded-3xl border border-gray-100 p-3 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-inner">
                  <img 
                    alt="Modern dashboard with AI fitness charts and biometrics" 
                    className="w-full h-auto" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD56AfucqsCghmjnHJMu2eVnqIvQ8G8ZXzARw6LlCrXxgKmwN6lx_X452YxU_h8TQIEKa_eCNGutJVbDhUKdGGYc-vWgWMOGAHU3v5Ac1X3_K4Ye3EAL7bnKD0-pf0BSbKaNh7YXnzQc7IL56EX028kWtQF2vlhIe5tQ2Av3iF-fwl6Q2uI-6DS3ShpO0cLImS5iij6xXSB4qsr7NcIJLqN5UcT_2OlNMR5lnodJIa8DoR-xYU93olVwsVvqMuSmClmankr1KS1xw" 
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">Advanced AI Features</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Intelligent algorithms that adapt to your unique physiology and training environment.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <FeatureCard 
                icon={<Dumbbell className="text-blue-600" />} 
                title="AI Workout Plans" 
                desc="Dynamic routines that evolve daily based on your biometric feedback and performance metrics." 
                color="bg-blue-50"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <FeatureCard 
                icon={<Zap className="text-green-600" />} 
                title="Fatigue Insights" 
                desc="Understand exactly when to push for a new PR and when your body requires essential recovery time." 
                color="bg-green-50"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <FeatureCard 
                icon={<HeartPulse className="text-blue-600" />} 
                title="Recovery Tracking" 
                desc="Maximize gains with precision data tracking your HRV, sleep quality, and muscle readiness." 
                color="bg-blue-50"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <FeatureCard 
                icon={<BarChart3 className="text-green-600" />} 
                title="Real-time Analysis" 
                desc="Instant feedback on your form and performance using computer vision and sensor fusion technologies." 
                color="bg-green-50"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <FeatureCard 
                icon={<Apple className="text-blue-600" />} 
                title="Macro Optimization" 
                desc="Smart nutrition plans tailored to your specific goals, body type, and daily energy expenditure." 
                color="bg-blue-50"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <FeatureCard 
                icon={<Users className="text-green-600" />} 
                title="Social Challenges" 
                desc="Compete in AI-refereed challenges and grow with a community of performance-minded athletes." 
                color="bg-green-50"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">How It Works</h2>
              <p className="text-gray-600 text-lg">Three simple steps to smarter fitness.</p>
            </div>
          </ScrollReveal>

          <div className="relative flex flex-col md:flex-row gap-12 justify-between">
            <ScrollReveal delay={0.1}>
              <StepCard step={1} title="Create Profile" desc="Input your goals, biometrics, and sync your wearable devices." />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <StepCard step={2} title="AI Generates Plan" desc="Our neural network crafts a bespoke roadmap based on your current level." />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <StepCard step={3} title="Track & Adapt" desc="Watch your plan evolve daily as the AI learns from your body's response." />
            </ScrollReveal>
            
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[1px] bg-gray-200 -z-0"></div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="bg-blue-50 absolute -inset-6 rounded-[2rem] -z-10"></div>
              <img 
                alt="Athlete using a mobile app to check fitness progress" 
                className="relative rounded-[2rem] shadow-xl w-full object-cover aspect-square" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYL-IfhXSE-AqjU4OPZgYfjlVVxquR3LLbJ3FTSpY6LQ8LEcCc9I_oe4xr1JWk1nPB8OJLSJ1gFwBuPhYPSUWTvEUitq7iIgu6LA8rSUBFRjU1evzAk5ecPhHC9TRrGE3oNTnNg8s9Wmah-vSl0PH1g38pYcpxS9fur0AGcVek_6Cmt7x5cm78cDgC3OCRf9tVStS1HN0EEZxpFqpGj4TzHoHY99vzLYzCz4TKyYGakTr3H7msWxHgja8CFgXOKzKHhfFZtaJRug" 
              />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900 tracking-tight">
                Experience the <span className="text-blue-600">AI Difference</span>
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">Stop guessing and start growing with insights that traditional personal trainers simply cannot provide.</p>
            </ScrollReveal>

            <div className="space-y-8">
              {[
                { title: 'No Expensive Trainer', desc: 'Get elite-level coaching at a fraction of the traditional cost, available 24/7.' },
                { title: 'Adapts to Progress', desc: 'Your plan changes based on actual performance, not just a static calendar.' },
                { title: 'Data Privacy First', desc: 'Your biometric data is encrypted and used only to optimize your results.' }
              ].map((benefit, i) => (
                <ScrollReveal key={i} delay={0.1 * i}>
                  <div className="flex items-start gap-4">
                    <div className="size-6 bg-green-50 text-green-500 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">User Success Stories</h2>
              <p className="text-gray-600 text-lg">Join 100,000+ athletes optimizing their gains.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <TestimonialCard 
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuCmrgWRBWXIrI-BQCAXBuB1-bUkhVEH-MDLeE-bYdJjXl6JDt3H_n_rJwh27-j-7c28FHHsJ6W8XnJPadzSREo7MklwPZxnF9kRUSR57nBPebILqvBMRBz9lyW4u7SGGdEjjnVwHbDScPpunFCHcc6YreIQnR1ZlgFlc7EXik0xpzHU1HJP1mRRPu7htSXwVoUG0eX37qOVN_DMrNH_FbQEYPocqn5-3GMfteRSvGZCYFBA7jrgid_cWzaEhUfyEJoDsuqkH0fCbQ"
                name="Sarah Jenkins"
                role="Pro Marathoner"
                quote="The fatigue insights changed my training cycle. I've avoided burnout for the first time in 4 years of competing."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <TestimonialCard 
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuCMGfBr203HjW2Js4iIvSrtNSmNXgCIuQ7-ZpEkfGvnjXs_1g6X-ynPyES-zj1FV44qU7oMzXPqGaZyaAK0WOznqWFT3P7egBGXDUp7Rys9AubnwkEZEiFIpqDrrmb4-96DngnqN7DR6w3iLeBqLawTklyIuqo9raopoV9E5psuRuJN1I7Bj3Q58SylJ70cFdW_L0O8MY5oBbNN5jNuwlmOIlpWk0RFdo8RwL_r300MpirpCHaLRbJL5_5jo8_SPQOa_DnOF9dT2A"
                name="Mark Thompson"
                role="Fitness Enthusiast"
                quote="I lost 20lbs in 3 months. The macro optimization is so much smarter than basic calorie counting apps."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <TestimonialCard 
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuB6E6AxECJrphnOqH8oi8PsuaBSWdVpiQoTIBQF5sSnk242pQCr_8B8Efi8FOW95KR7rDzRhiWYKlJqNpG_aXxY5R17a-mEOX3zsliJc4wZqsspEnGAKVhf3C16Qscjl9j-GyI5udRSPPtQImKU5pJS8CbCrw67vHUNuRng5kEvtN8w-ShYyZ7QNVkzxAHYrdhrhvCQYlNkS-LnnHdHFpgWsoksLfEMBPt953t6Wrm5uGsf9_NHmmHmXvyfwSssvhiylVJTBEWj9A"
                name="David Chen"
                role="Crossfit Athlete"
                quote="The real-time form analysis corrected my squat technique instantly. It's like having a coach right next to me."
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden relative bg-blue-600 p-12 md:p-20 text-center shadow-2xl shadow-blue-200">
            <div className="absolute inset-0 opacity-10 mix-blend-overlay">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
              </svg>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Ready to transcend your limits?</h2>
              <p className="text-blue-50 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                 No credit card required. Experience the power of AI fitness coaching.
              </p>
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-full text-xl font-bold transition-all shadow-xl active:scale-95" onClick={()=>router.push('/auth/signup')}>
                Join Now
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bolt className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-gray-900">AI Fitness</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Building the future of human performance through artificial intelligence and data science.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 text-gray-900">Product</h5>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a className="hover:text-blue-600 transition-colors" href="#">Features</a></li>
              <li><a className="hover:text-blue-600 transition-colors" href="#">Integrations</a></li>
              <li><a className="hover:text-blue-600 transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-blue-600 transition-colors" href="#">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-gray-900">Company</h5>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a className="hover:text-blue-600 transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-blue-600 transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-blue-600 transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-blue-600 transition-colors" href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-gray-900">Connect</h5>
            <div className="flex gap-4">
              <a className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all" href="#">
                <Share2 className="w-5 h-5" />
              </a>
              <a className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all" href="#">
                <Mail className="w-5 h-5" />
              </a>
              <a className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all" href="#">
                <Globe className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-8">
              <div className="px-3 py-1 rounded bg-gray-50 border border-gray-100 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <ShieldCheck className="w-3 h-3 text-blue-600" /> Built with AI
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2024 AI Fitness Tracker. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a className="hover:text-blue-600" href="#">Status</a>
            <a className="hover:text-blue-600" href="#">Security</a>
            <a className="hover:text-blue-600" href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
