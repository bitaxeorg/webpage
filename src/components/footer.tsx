export function Footer() {
  return (
    <footer className='w-full py-6 text-center text-xs sm:text-sm text-muted-foreground'>
      <p>
        © {new Date().getFullYear()} Open Source Miners United. All rights
        reserved.
      </p>
      <p>Maintained by WantClue and MrV</p>
    </footer>
  );
}
