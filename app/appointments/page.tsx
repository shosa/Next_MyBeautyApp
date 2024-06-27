import Toolbar from '../../components/Toolbar';
export default function appointments() {
  return (
    <main className="bg-white text-center p-4 min-h-screen">
      <Toolbar pageTitle='Appuntamenti' showPlusButton={true} />
      {/* Contenuto specifico della pagina */}
    </main>
  );
}
