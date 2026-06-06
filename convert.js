const fs = require('fs');

const html = fs.readFileSync('C:\\\\My Web Sites\\\\decorv2\\\\kitpro-reinette.webflow.io\\\\index.html', 'utf8');

const heroMatch = html.match(/<section id="section-hero" class="section hero">.*?<\/section>/s);
const aboutMatch = html.match(/<section id="section-about" class="section about">.*?<\/section>/s);

if (heroMatch && aboutMatch) {
  let combined = heroMatch[0] + '\n\n' + aboutMatch[0];
  
  // Convert to JSX
  combined = combined
    .replace(/class=/g, 'className=')
    .replace(/<!--.*?-->/gs, '')
    .replace(/<img([^>]*?)>/g, (m, p1) => {
      if(p1.endsWith('/')) return m;
      return `<img${p1} />`;
    })
    .replace(/<br>/g, '<br />')
    .replace(/<source([^>]*?)>/g, (m, p1) => {
      if(p1.endsWith('/')) return m;
      return `<source${p1} />`;
    })
    .replace(/srcset=/g, 'srcSet=')
    .replace(/autoplay=""/g, 'autoPlay')
    .replace(/playsinline=""/g, 'playsInline')
    .replace(/muted=""/g, 'muted')
    .replace(/loop=""/g, 'loop');

  // Fix inline styles
  combined = combined.replace(/style="([^"]*)"/g, (m, p1) => {
    let styles = p1.split(';').filter(Boolean).map(s => {
      let [k, ...vArr] = s.split(':');
      let v = vArr.join(':');
      if(!k || !v) return '';
      k = k.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      return `${k}: '${v.trim().replace(/'/g, "\\'")}'`;
    }).filter(Boolean).join(', ');
    return `style={{${styles}}}`;
  });

  fs.writeFileSync('webflow-sections.jsx', combined);
  console.log('JSX written to webflow-sections.jsx');
} else {
  console.log('Sections not found');
}
