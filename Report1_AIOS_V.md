# تقرير المقارنة: الريبو الحالي مقابل `AIOS-V`

يحتوي ريبو `AIOS-V` على هيكلية مختلفة تمامًا تركز على الواجهة الخلفية (Backend) وبوتات تليجرام ولوحة تحكم منفصلة، في حين أن الريبو الحالي يركز على واجهة المتجر (Storefront).

## 1. الملفات الخاصة بـ `AIOS-V` (غير الموجودة في الريبو الحالي)

فيما يلي قائمة بأهم الملفات الحصرية في ريبو `AIOS-V` ووظيفة كل منها:

### الملف: `main.py`
**الوظيفة:** ملف واجهة برمجة التطبيقات الأساسي (FastAPI) يحتوي على الـ Backend ونظام استقبال المدخلات.
```python
"""
AIOS v2 — نظام إدارة مخزون الأبرار
FastAPI Backend — مع منظومة استقبال المدخلات الذكي (Smart Ingestion Pipeline)
"""

from fastapi import FastAPI, HTTPException, Query, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List
import asyncpg
from contextlib import asynccontextmanager
import os
import io
import re
import json
import logging
from datetime import datetime, date
from dotenv import load_dotenv
import uuid
...
```

### الملف: `bot_internal.py`
**الوظيفة:** بوت تليجرام الداخلي لإدارة المخزون، تسجيل القطع، والبحث.
```python
"""
AIOS v2 — بوت تيليجرام الداخلي
شركة الأبرار لقطع غيار السيارات الصينية
يدعم: تسجيل القطع المستعملة، استيراد الجديد، والبحث الذكي متعدد الموردين
"""

import os
import io
import json
import logging
import asyncio
from datetime import datetime
from dotenv import load_dotenv

import psycopg2
import psycopg2.extras
import httpx
from PIL import Image
from google import genai as google_genai

...
```

### الملف: `bot_public.py`
**الوظيفة:** بوت تليجرام العام للرد على العملاء واستعلامات القطع.
```python
import os
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from search_fallback import search_with_fallback
from dotenv import load_dotenv

load_dotenv()
BOT_TOKEN = os.getenv("TELEGRAM_PUBLIC_BOT_TOKEN")

SYSTEM_PROMPT = """
أنت اسمك "أبرار"، خبير مبيعات قطع غيار سيارات في شركة الأبرار.
مهمتك:
- الردود يجب أن تكون قصيرة ومباشرة (2-3 جمل كحد أقصى).
- للقطع الجديدة: أعط السعر إن وجد وحاول إتمام البيع.
- للقطع المستعملة: أعط معلومات التوافر فقط بدون سعر، واطلب من العميل التواصل مع قسم المبيعات لمعرفة السعر والتفاصيل.
- ممنوع منعاً باتاً أن تقول "القطعة غير متوفرة". إذا لم تجد القطعة، قل أنك بحاجة للتحقق من المخزن الخارجي واطلب التواصل عبر الواتساب: wa.me/201023660666.
- ممنوع عرض سعر الشراء (purchase_price) إطلاقاً.
- كن ودوداً واحترافياً.
"""
...
```

### الملف: `dashboard/package.json`
**الوظيفة:** إعدادات واجهة المستخدم (Dashboard) باستخدام Next.js.
```python
{
  "name": "dashboard",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@base-ui/react": "^1.5.0",
    "@types/pg": "^8.20.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "framer-motion": "^12.40.0",
    "js-cookie": "^3.0.8",
    "lucide-react": "^1.17.0",
    "next": "16.2.6",
...
```

### الملف: `schema.sql`
**الوظيفة:** هيكل قاعدة البيانات الأساسي.
```python
-- =============================================
-- AIOS Database Schema v2
-- شركة الأبرار لقطع غيار السيارات الصينية
-- =============================================

-- جدول الكتالوج (معلومات القطعة الثابتة)
CREATE TABLE IF NOT EXISTS catalog (
    id              SERIAL PRIMARY KEY,
    sku             VARCHAR(100) UNIQUE,
    brand           VARCHAR(100),
    model           VARCHAR(100),
    compatible_models TEXT[],
    name_ar         VARCHAR(500) NOT NULL,
    name_en         VARCHAR(500),
    category        VARCHAR(100),
    oem_number      VARCHAR(200),
    images          TEXT[],
    created_at      TIMESTAMP DEFAULT NOW()
);

...
```

## 2. نظرة عامة على الاختلافات الهيكلية
- **AIOS-V** يعتمد بشكل كبير على `Python` و `FastAPI` لتقديم خدمات الواجهة الخلفية (Backend).
- يتضمن نظامين للبوتات (`bot_internal.py` و `bot_public.py`) لإدارة المبيعات والمخزون الداخلي وخدمة العملاء.
- يحتوي على مجلد `dashboard/` الذي يتضمن تطبيق `Next.js` مستقل لإدارة لوحة التحكم الخاصة بالشركة، وهو منفصل عن واجهة المتجر الموجودة في الريبو الحالي.
- توجد ملفات خاصة بتزامن البيانات مثل `sync_to_contabo.py` و `sync_pg_to_contabo.sh` مما يدل على وجود بنية تحتية للتزامن مع خوادم خارجية.
