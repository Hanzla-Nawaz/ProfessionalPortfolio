export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="text-center">
          <div className="text-xl font-bold mb-4">Hanzla Nawaz</div>
          <p className="text-muted mb-6">
            AI/ML Engineer passionate about building intelligent systems that solve real-world problems.
          </p>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Hanzla Nawaz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
