import { test, expect, Page, chromium} from '@playwright/test';

export class maps {
    private readonly page: Page

    constructor(page) {
        this.page = page
    }



    async location1 (){
        const placeUrl = 'https://www.google.com/maps/place/SPBU+Pertamina+54.601.100+-+Ngagel/@-7.2967166,112.7398378,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fba2df5ba1b1:0xc5f2e9aa0f78ae13!8m2!3d-7.2967219!4d112.7424127!16s%2Fg%2F1hm44g81t?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D'

        await this.page.goto(placeUrl)

        await this.page.waitForTimeout(10000)
        const label = this.page.locator('div[jsaction="mouseover:pane.wfvdle0; mouseout:pane.wfvdle1"]')
        await label.hover()
        await label.scrollIntoViewIfNeeded()
        await this.page.waitForTimeout(2000)

        const popularTimesLocator = this.page.locator('.fontHeadlineSmall').nth(1).filter({ hasText: 'Jam Ramai' })
        await popularTimesLocator.waitFor({ timeout: 10000 });
        const liveStatus = await this.page.locator('div.UgBNB.fontBodySmall').textContent()
        console.log('SPBU Pertamina 54.601.100 - Ngagel:', liveStatus?.trim())

        //txt
        const hasilSimpan1 = 'Status' +  liveStatus
        const fs = require('fs')
        fs.appendFileSync('status.txt', hasilSimpan1 || 'Tidak ada status' )

        //json
        const liveStatusResult = liveStatus?.trim() || 'Tidak ada status'

        type StatusData = {
            lokasi: string;
            status: string;
            waktu: string;
        }

            const dataBaru : StatusData = {
            lokasi: 'SPBU Pertamina 54.601.100 - Ngagel',
            status: liveStatusResult,
            waktu: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
        }

        const filePath = 'status.json'

        let dataLama : StatusData[] = []

        // Cek apakah file sudah ada dan bisa dibaca
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8')
            try {
                dataLama = JSON.parse(fileContent)
            } catch (e) {
                console.warn('File JSON rusak atau kosong, akan ditimpa baru.')
            }
        }

        // Tambahkan data baru ke array lama
        dataLama.push(dataBaru)

        // Tulis ulang ke file JSON
        fs.writeFileSync(filePath, JSON.stringify(dataLama, null, 2))

        console.log('Status berhasil disimpan ke status.json')
    }

        async location2() {
            const placeUrl = 'https://www.google.com/maps/place/MASPION+SQUARE/@-7.3163128,112.7276629,14.92z/data=!4m14!1m7!3m6!1s0x2dd7fb9e2e33845f:0x455409e45d94f7da!2sTaman+Mayangkara!8m2!3d-7.3069994!4d112.7355235!16s%2Fg%2F11g6mdhl44!3m5!1s0x2dd7fb5a104cae0b:0x134b020dd584cdcf!8m2!3d-7.3154342!4d112.7356969!16s%2Fg%2F1tfwskn5?entry=ttu';

            try {
                // Tambah timeout pada page.goto agar bisa handle halaman berat
                await this.page.goto(placeUrl, { timeout: 60000, waitUntil: 'domcontentloaded' });
                await this.page.waitForTimeout(10000);

                const label = this.page.locator('div[jsaction="mouseover:pane.wfvdle0; mouseout:pane.wfvdle1"]');
                await label.hover();
                await label.scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(2000);

                const popularTimesLocator = this.page.locator('.fontHeadlineSmall').nth(2).filter({ hasText: 'Jam Ramai' });

                let liveStatusResult2 = 'Lokasi Belum Buka, Status Belum Available';

                try {
                    await popularTimesLocator.waitFor({ timeout: 15000 });

                    const liveStatusLocator = this.page.locator('div.UgBNB.fontBodySmall');
                    const count = await liveStatusLocator.count();

                    if (count > 0) {
                        const liveStatus = await liveStatusLocator.first().textContent();
                        liveStatusResult2 = liveStatus?.trim() || 'Lokasi Belum Buka, Status Belum Available';
                    }
                } catch (e) {
                    console.warn('Elemen "Jam Ramai" atau status live tidak ditemukan.');
                }

                console.log('Status keramaian Maspion Square:', liveStatusResult2);

                const hasilSimpan2 = 'Status Maspion Square: ' + liveStatusResult2 + '\n';

                const fs = require('fs');
                fs.appendFileSync('status.txt', hasilSimpan2);

                type StatusData = {
                    lokasi: string;
                    status: string;
                    waktu: string;
                };

                const dataBaru: StatusData = {
                    lokasi: 'Maspion Square',
                    status: liveStatusResult2,
                    waktu: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
                };

                const filePath = 'status.json';
                let dataLama: StatusData[] = [];

                if (fs.existsSync(filePath)) {
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    try {
                        dataLama = JSON.parse(fileContent);
                    } catch (e) {
                        console.warn('File JSON rusak atau kosong, akan ditimpa baru.');
                    }
                }

                dataLama.push(dataBaru);
                fs.writeFileSync(filePath, JSON.stringify(dataLama, null, 2));

                console.log('Status berhasil disimpan ke status.json');

            } catch (error) {
                console.error('Gagal memuat halaman atau proses gagal:', error.message);
            }
        }


    
        async location3 (){
            const placeUrl = 'https://www.google.com/maps/place/Surabaya+Zoo/@-7.2950023,112.7344359,17z/data=!4m14!1m7!3m6!1s0x2dd7fbbe1837258d:0x6de4060b6596563f!2sBungkul+Park!8m2!3d-7.2913468!4d112.7398218!16s%2Fg%2F121_bvsv!3m5!1s0x2dd7fb97917c2fad:0x21b1122d5fe174cc!8m2!3d-7.296163!4d112.7366473!16s%2Fm%2F0j51vc7?entry=ttu&g_ep=EgoyMDI1MDcwOC4wIKXMDSoASAFQAw%3D%3D'

            await this.page.goto(placeUrl)

            await this.page.waitForTimeout(10000)
            const label = this.page.locator('div[jsaction="mouseover:pane.wfvdle0; mouseout:pane.wfvdle1"]')
            await label.hover()
            await label.scrollIntoViewIfNeeded()
            await this.page.waitForTimeout(2000)

            const popularTimesLocator = this.page.locator('.fontHeadlineSmall').nth(2).filter({ hasText: 'Jam Ramai' })
            await popularTimesLocator.waitFor({ timeout: 10000 });
            const liveStatus = await this.page.locator('div.UgBNB.fontBodySmall').textContent()
            console.log('Status keramaian Kebun Binatang Surabaya:', liveStatus?.trim())

            const hasilSimpan3 = 'Status Kebun Binatang Surabaya: ' + liveStatus + '\n'

            const fs = require('fs')
            fs.appendFileSync('status.txt', hasilSimpan3 || 'Tidak ada status'+ '\n')

            const liveStatusResult3 = liveStatus?.trim() || 'Tidak ada status'

            type StatusData = {
                lokasi: string;
                status: string;
                waktu: string;
            }

                const dataBaru : StatusData = {
                lokasi: 'Kebun Binatang Surabaya',
                status: liveStatusResult3,
                waktu: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
            }

            const filePath = 'status.json'

            let dataLama : StatusData[] = []

            // Cek apakah file sudah ada dan bisa dibaca
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf-8')
                try {
                    dataLama = JSON.parse(fileContent)
                } catch (e) {
                    console.warn('File JSON rusak atau kosong, akan ditimpa baru.')
                }
            }

            // Tambahkan data baru ke array lama
            dataLama.push(dataBaru)

            // Tulis ulang ke file JSON
            fs.writeFileSync(filePath, JSON.stringify(dataLama, null, 2))

            console.log('Status berhasil disimpan ke status.json')

    }

        async location4() {
            const placeUrl = 'https://www.google.com/maps/place/Tunjungan+Plaza/@-7.2623721,112.7367034,17z/data=!4m14!1m7!3m6!1s0x2dd7f960aee9a64d:0xaa9e2f2c4ed67175!2sTunjungan+Plaza!8m2!3d-7.2623774!4d112.7392783!16s%2Fm%2F03nn8x_!3m5!1s0x2dd7f960aee9a64d:0xaa9e2f2c4ed67175!8m2!3d-7.2623774!4d112.7392783!16s%2Fm%2F03nn8x_?entry=ttu&g_ep=EgoyMDI1MDcwOC4wIKXMDSoASAFQAw%3D%3D';

            await this.page.goto(placeUrl);
            await this.page.waitForTimeout(10000);

            const label = this.page.locator('div[jsaction="mouseover:pane.wfvdle0; mouseout:pane.wfvdle1"]');
            await label.hover();
            await label.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(2000);

            const popularTimesLocator = this.page.locator('.fontHeadlineSmall').nth(1).filter({ hasText: 'Jam Ramai' });

            try {
                await popularTimesLocator.waitFor({ timeout: 10000 });
            } catch (e) {
                console.warn('Elemen "Jam Ramai" tidak ditemukan.');
            }

            const liveStatusLocator = this.page.locator('div.UgBNB.fontBodySmall');
            const count = await liveStatusLocator.count();

            let liveStatusResult3 = 'Lokasi Belum Buka, Status Belum Available';

            if (count > 0) {
                const liveStatus = await liveStatusLocator.first().textContent();
                liveStatusResult3 = liveStatus?.trim() || 'Lokasi Belum Buka, Status Belum Available';
            }

            console.log('Status keramaian Tunjungan Plaza:', liveStatusResult3);

            const hasilSimpan4 = 'Status Tunjungan Plaza: ' + liveStatusResult3 + '\n';

            const fs = require('fs');
            fs.appendFileSync('status.txt', hasilSimpan4);

            type StatusData = {
                lokasi: string;
                status: string;
                waktu: string;
            };

            const dataBaru: StatusData = {
                lokasi: 'Tunjungan Plaza',
                status: liveStatusResult3,
                waktu: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
            };

            const filePath = 'status.json';
            let dataLama: StatusData[] = [];

            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                try {
                    dataLama = JSON.parse(fileContent);
                } catch (e) {
                    console.warn('File JSON rusak atau kosong, akan ditimpa baru.');
                }
            }

            dataLama.push(dataBaru);
            fs.writeFileSync(filePath, JSON.stringify(dataLama, null, 2));

            console.log('Status berhasil disimpan ke status.json');
        }


        async location5 (){
            const placeUrl = 'https://www.google.com/maps/place/LAPANGAN+THOR/@-7.2870572,112.7273825,16z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fbed27d1abc7:0xa64fe890acee34c6!8m2!3d-7.2870625!4d112.7299574!16s%2Fg%2F11kpvd0s5g?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D'

            await this.page.goto(placeUrl)

            await this.page.waitForTimeout(10000)
            const label = this.page.locator('div[jsaction="mouseover:pane.wfvdle0; mouseout:pane.wfvdle1"]')
            await label.hover()
            await label.scrollIntoViewIfNeeded()
            await this.page.waitForTimeout(2000)

            const popularTimesLocator = this.page.locator('.fontHeadlineSmall').nth(2).filter({ hasText: 'Jam Ramai' })
            await popularTimesLocator.waitFor({ timeout: 10000 });
            const liveStatus = await this.page.locator('div.UgBNB.fontBodySmall').textContent()
            console.log('Status keramaian Lapangan Thor:', liveStatus?.trim())

            const hasilSimpan5 = 'Status Lapangan Thor: ' + liveStatus + '\n'

            const fs = require('fs')
            fs.appendFileSync('status.txt', hasilSimpan5 || 'Tidak ada status'+ '\n')

            const liveStatusResult4 = liveStatus?.trim() || 'Tidak ada status'

            type StatusData = {
                lokasi: string;
                status: string;
                waktu: string;
            }

                const dataBaru : StatusData = {
                lokasi: 'Lapangan Thor',
                status: liveStatusResult4,
                waktu: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
            }

            const filePath = 'status.json'

            let dataLama : StatusData[] = []

            // Cek apakah file sudah ada dan bisa dibaca
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf-8')
                try {
                    dataLama = JSON.parse(fileContent)
                } catch (e) {
                    console.warn('File JSON rusak atau kosong, akan ditimpa baru.')
                }
            }

            // Tambahkan data baru ke array lama
            dataLama.push(dataBaru)

            // Tulis ulang ke file JSON
            fs.writeFileSync(filePath, JSON.stringify(dataLama, null, 2))

            console.log('Status berhasil disimpan ke status.json')
    }
}

