import os
import re

def migrate_to_light_theme(directory):
    replacements = {
        r'bg-slate-900/40': 'bg-white/80',
        r'bg-slate-900/50': 'bg-white/90',
        r'bg-slate-900/60': 'bg-white/90',
        r'bg-slate-900/80': 'bg-white/95',
        r'bg-slate-900/90': 'bg-white',
        r'bg-slate-900/95': 'bg-white',
        r'bg-slate-900': 'bg-white',
        r'bg-slate-800/40': 'bg-slate-100/80',
        r'bg-slate-800/50': 'bg-slate-100/90',
        r'bg-slate-800/60': 'bg-slate-100/90',
        r'bg-slate-800/80': 'bg-slate-100/95',
        r'bg-slate-800': 'bg-slate-100',
        r'text-slate-400': 'text-slate-500',
        r'text-slate-300': 'text-slate-700',
        r'text-slate-200': 'text-slate-800',
        r'text-white': 'text-slate-900',
        r'border-slate-800': 'border-slate-200',
        r'border-slate-700/50': 'border-slate-200/50',
        r'border-slate-700': 'border-slate-300',
        r'border-white/10': 'border-slate-200',
        r'border-white/5': 'border-slate-200',
        r'ring-white/10': 'ring-slate-900/5',
        r'hover:bg-slate-800/50': 'hover:bg-slate-100',
        r'hover:bg-slate-800': 'hover:bg-slate-200',
        r'from-slate-900': 'from-slate-50',
        r'to-slate-900': 'to-slate-50',
        r'to-[#070b14]': 'to-slate-100',
        r'bg-\[\#070b14\]': 'bg-slate-50',
        r'bg-\[\#0d1424\]': 'bg-white',
        r'text-emerald-400': 'text-emerald-600',
        r'text-cyan-400': 'text-cyan-600',
        r'text-amber-400': 'text-amber-600',
        r'text-red-400': 'text-red-600',
        r'text-emerald-300': 'text-emerald-700',
    }

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                for pattern, replacement in replacements.items():
                    # Word boundary to avoid replacing parts of other classes
                    content = re.sub(r'(?<![a-zA-Z0-9-])' + pattern + r'(?![a-zA-Z0-9-])', replacement, content)
                
                if original_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated: {filepath}")

if __name__ == '__main__':
    migrate_to_light_theme(r'c:\Users\pavan\Downloads\Anvation-hackothon\src')
