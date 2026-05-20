const fs = require('fs');

const htmlPath = 'afiliados/index.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const styleRegex = /<style>([\s\S]*?)<\/style>/;
const match = htmlContent.match(styleRegex);

if (match) {
  const cssContent = match[1];
  
  // Split css logic based on comments
  let headerCss = '';
  let footerCss = '';
  let heroCss = ''; // goes to afiliados.css
  let otherCss = ''; // goes to afiliados.css

  const lines = cssContent.split('\n');
  let currentSection = 'other';

  for (const line of lines) {
    if (line.includes('/* ═══ Header (Replicated from download-noping) ═══ */')) {
      currentSection = 'header';
    } else if (line.includes('/* ═══ Hero Layout & Core ═══ */')) {
      currentSection = 'hero';
    } else if (line.includes('/* ═══ Footer Certificates ═══ */') || line.includes('/* ═══ Footer (Replicated from download-noping) ═══ */')) {
      currentSection = 'footer';
    } else if (line.includes('/* ═══ Seções Viewport ═══ */') || line.includes('/* ═══ Tutorial Section Styles ═══ */') || line.includes('/* ═══ Rank Section Styles ═══ */') || line.includes('/* ═══ FAQ Section Styles ═══ */')) {
      currentSection = 'other';
    }

    if (currentSection === 'header') {
      headerCss += line + '\n';
    } else if (currentSection === 'footer') {
      footerCss += line + '\n';
    } else if (currentSection === 'hero' || currentSection === 'other') {
      otherCss += line + '\n';
    }
  }

  // Write files
  fs.writeFileSync('src/styles/components/header.css', headerCss);
  fs.writeFileSync('src/styles/components/footer.css', footerCss);
  fs.writeFileSync('src/styles/pages/afiliados.css', otherCss);

  // Remove style block from html
  const newHtmlContent = htmlContent.replace(styleRegex, '<link rel="stylesheet" href="../src/styles/global/reset.css">\n<link rel="stylesheet" href="../src/styles/global/variables.css">\n<link rel="stylesheet" href="../src/styles/global/typography.css">\n<link rel="stylesheet" href="../src/styles/global/layout.css">\n<link rel="stylesheet" href="../src/styles/global/utilities.css">\n<link rel="stylesheet" href="../src/styles/components/header.css">\n<link rel="stylesheet" href="../src/styles/components/footer.css">\n<link rel="stylesheet" href="../src/styles/pages/afiliados.css">');
  fs.writeFileSync(htmlPath, newHtmlContent);
  
  console.log('CSS extracted and HTML updated successfully.');
} else {
  console.log('No <style> tag found in afiliados/index.html');
}
