const Container = ({ children, idSelected }) => {
  return (
    <main
      className={`{w-full bg-slate-600 grid ${
        idSelected ? "md:grid-cols-2" : "md:grid-cols-1"
      } sm:grid-cols-1}`}
    >
      {children}
    </main>
  );
};

export default Container;
