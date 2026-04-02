export default function Footer() {
  return (
    <footer className="bg-background border-t-2 border-border py-6 text-text">
      <div className="mx-auto flex max-w-6xl flex-col md:flex-row justify-between px-4 text-sm">
        <p className="font-semibold">
          © {new Date().getFullYear()} Connekt Inc. All rights reserved.
        </p>
        <div className="mt-3 flex gap-4 md:mt-0">
          <a href="/privacy" className="hover:text-primary">Privacy Policy</a>
          <a href="/terms" className="hover:text-primary">Terms of Service</a>
          <a href="/contact" className="hover:text-primary">Contact</a>
        </div>
      </div>
    </footer>
  );
}