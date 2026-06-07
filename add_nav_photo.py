import os

old = '<a href="index.html" class="nav-logo">BLIZCITY</a>'
new = '<a href="index.html" class="nav-logo" style="display:flex;align-items:center;gap:10px;"><img src="images/moonkhid-1.jpg" alt="MoonkhidMusic" style="width:36px;height:36px;border-radius:50%;object-fit:cover;object-position:center 20%;border:2px solid #C0392B;flex-shrink:0;">BLIZCITY</a>'

files = [f for f in os.listdir('.') if f.endswith('.html')]

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    updated = content.replace(old, new)
    if updated != content:
        with open(f, 'w') as file:
            file.write(updated)
        print(f"✅ Updated {f}")
    else:
        print(f"⏭️ No change: {f}")
