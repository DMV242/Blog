const Container = ({ children }) => {
  return (
    <main className="w-full bg-slate-600 grid md:grid-cols-2 sm:grid-cols-1 ">
      {children}
    </main>
  );
};

export default Container;
