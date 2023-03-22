export default function Footer() {
    return <footer className="border h-32 bg-blue-50 p-5 relative">
        <p className="text-center text-sm text-slate-500 leading-relaxed">
            Questions? Contact pickflick's developer directly at <a className="text-blue-500 underline" href="mailto:jhdl.ruben@gmail.com">jhdl.ruben@gmail.com</a>
        </p>
        {/* <ul className="flex gap-4 justify-center mt-5 text-xs text-slate-600 underline">
            <li>Attributions</li>
            <li>Legal</li>
        </ul> */}
        <p className="absolute bottom-0 right-0 left-0 text-center text-sm text-slate-500 mb-1 border-t pt-1">2023 © PickFlick</p>
    </footer>
}