import Header from "./components/Header";
import Hero from "./components/Hero";
import Aurora from "./components/Aurora/Aurora";
import SplashCursor from "./components/SplashCursor/SplashCursor";

const App = () => {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Aurora
          colorStops={['#3b82f6', '#10b981', '#3b82f6']}
          speed={0.5}
        />
      </div>
      <SplashCursor />
      <Header />
      <Hero />
    </>
  );
};

export default App;
