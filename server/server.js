const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const sequelize = require('./src/config/db')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test endpoint
app.get('/', (req, res) => {
    res.send('Sosyal medya backend çalışıyor!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor...`);

    // Veritabanı bağlantısını kontrol et
    try {
        await sequelize.sync(); // Modellerle veritabanı tablolarını senkronize eder
        console.log('✅ Veritabanı senkronizasyonu başarılı!');
    } catch (error) {
        console.error('❌ Veritabanı senkronizasyonu başarısız:', error.message);
    }
});