import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "pt-PT", name: "Português (Portugal)", flag: "🇵🇹" },
  { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
  { code: "en-US", name: "English (USA)", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-orange-600/30 text-orange-500 hover:bg-orange-600/10 gap-2"
          title="Selecionar idioma"
        >
          <span className="text-lg">{currentLanguage?.flag}</span>
          <span className="hidden sm:inline">{currentLanguage?.name.split("(")[0].trim()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-orange-700/30">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer text-gray-300 hover:text-orange-400 hover:bg-slate-700 ${
              language === lang.code ? "bg-orange-600/20 text-orange-400" : ""
            }`}
          >
            <span className="mr-2 text-lg">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
