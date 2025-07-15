const { execSync } = require('child_process');

function isWithinWorkingHours() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 8 && hour < 16; // Jam 08:00 - 15:59
}

(async () => {
  console.log('⏳ Mulai loop test dari jam 08:00 sampai 16:00...\n');

  while (isWithinWorkingHours()) {
    const start = new Date().toLocaleTimeString();
    console.log(`🧪 Menjalankan test pada ${start}`);

    try {
      execSync('npx playwright test', { stdio: 'inherit' });
    } catch (err) {
      console.error('Test gagal, lanjut ke iterasi berikutnya.\n');
    }

    await new Promise(res => setTimeout(res, 10000));
  }

  console.log('✅ Waktu kerja selesai. Loop test dihentikan.');
})();
