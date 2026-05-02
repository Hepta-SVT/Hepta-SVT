// ========================================
// DATA.JS - جميع بيانات المنصة
// ========================================

// ---------- 1. بيانات الدروس ----------
const lessonsData = {
    nervous: {
        title: '🧠 Le système nerveux',
        paragraphs: [
            { title: "L'organisation", image: 'nervous_1.jpg' },
            { title: 'La sensibilité consciente', image: 'nervous_2.jpg' },
            { title: 'La motricité volontaire', image: 'nervous_3.jpg' },
            { title: 'Motricité involontaire', image: 'nervous_4.jpg' },
            { title: 'Hygiène', image: 'nervous_5.jpg' }
        ]
    },
    muscular: {
        title: '💪 Le système musculaire',
        paragraphs: [
            { title: 'Rôle du muscle', image: 'muscular_1.jpg' },
            { title: 'Structure', image: 'muscular_2.jpg' },
            { title: 'Besoins', image: 'muscular_3.jpg' }
        ]
    },
    immune: {
        title: '🛡️ Le système immunitaire',
        paragraphs: [
            { title: 'Immunité naturelle', image: 'immune_1.jpg' },
            { title: 'Immunité spécifique', image: 'immune_2.jpg' },
            { title: 'Organes lymphoïdes', image: 'immune_3.jpg' },
            { title: 'Renforcement', image: 'immune_4.jpg' }
        ]
    },
    dysfunction: {
        title: '🔴 Dysfonctionnements immunitaires',
        paragraphs: [
            { title: 'Allergies', image: 'dysfunction_1.jpg' },
            { title: 'SIDA', image: 'dysfunction_2.jpg' }
        ]
    }
};

// ---------- 2. بيانات اللعبة (10 مستويات) ----------
const levelsData = [
    // المستوى 1: L'organisation du système nerveux
    [
        { answer: 'CERVEAU', clue: 'centre nerveux / مركز عصبي', extra: ['T','M','N','K','P','X','B','L','A','R','D','F','G'] },
        { answer: 'MOELLE EPINIERE', clue: 'centre nerveux central / مركز عصبي مركزي', extra: ['X','T','K','A','B'] },
        { answer: 'NERFS', clue: 'organe nerveux périphérique / عضو عصبي محيطي', extra: ['T','M','A','K','L','X','B','P','D','G','H','J','Q','W','Z'] },
        { answer: 'CORPS CELLULAIRE', clue: 'situé dans la substance grise / يقع في المادة الرمادية', extra: ['X','T','K','M'] },
        { answer: 'AXONE', clue: 'situé dans la substance blanche / يقع في المادة البيضاء', extra: ['R','T','M','L','P','K','B','D','F','G','H','J','Q','W','Z'] },
        { answer: 'FIBRE NERVEUSE', clue: 'unité structurelle du nerf / وحدة بنيوية للعصب', extra: ['X','T','K','M','L','P'] },
        { answer: 'NEURONE', clue: 'cellule nerveuse / الخلية العصبية', extra: ['B','M','T','X','K','A','L','P','D','F','G','H','J'] },
        { answer: 'SYNAPSE', clue: 'zone entre deux neurones / منطقة بين عصبونين', extra: ['K','L','M','T','X','B','D','F','G','H','J','Q','W'] },
        { answer: 'GANGLION SPINAL', clue: 'situé au niveau de la racine dorsale / يقع عند الجذر الظهري', extra: ['X','T','K','M','B'] },
        { answer: 'NERF MIXTE', clue: 'transmet l\'influx nerveux sensitif et moteur / ينقل السيالة العصبية الحسية والحركية', extra: ['B','K','A','L','P','D','G','H','J','Q'] }
    ],

    // المستوى 2: La sensibilité consciente
    [
        { answer: 'RECEPTEUR', clue: 'élabore l\'influx nerveux sensitif / ينتج السيالة العصبية الحسية', extra: ['K','M','T','X','B','L','A','D','F','G','H'] },
        { answer: 'STIMULUS', clue: 'excitant externe / مثير خارجي', extra: ['K','B','N','P','A','X','D','F','G','H','J','Q','W'] },
        { answer: 'AIRE VISUELLE', clue: 'zone du cerveau pour la vue / منطقة الدماغ للرؤية', extra: ['X','T','K','M','B','P'] },
        { answer: 'NERF OPTIQUE', clue: 'conducteur de la sensibilité visuelle / ناقل الحساسية البصرية', extra: ['X','M','B','A','K','L'] },
        { answer: 'RÉTINE', clue: 'récepteur de la lumière / مستقبل الضوء', extra: ['B','M','K','A','X','P','D','F','G','H','J','Q','W','Z'] },
        { answer: 'PEAU', clue: 'organe de la sensibilité tactile / عضو الحساسية اللمسية', extra: ['B','M','T','R','K','L','X','D','F','G','H','J','Q','W','Z'] },
        { answer: 'INFLUX SENSITIF', clue: 'message nerveux vers le cerveau / رسالة عصبية نحو الدماغ', extra: ['X','K','M','A','B','T'] },
        { answer: 'CORPUSCULE', clue: 'récepteur sensoriel de la peau / مستقبل حسي للجلد', extra: ['M','K','T','X','B','A','F','G'] },
        { answer: 'AIRE TACTILE', clue: 'zone du cerveau pour le toucher / منطقة الدماغ للمس', extra: ['X','M','K','B','P','N'] },
        { answer: 'CONDUCTEUR', clue: 'transmet l\'influx nerveux / ينقل السيالة العصبية', extra: ['K','B','M','T','X','A','P','F','G','H'] }
    ],

    // المستوى 3: La motricité volontaire
    [
        { answer: 'AIRE MOTRICE', clue: 'origine de la motricité volontaire / منشأ الحركة الإرادية', extra: ['X','K','B','N','P','L','F','G'] },
        { answer: 'MUSCLE', clue: 'organe effecteur / العضو المنفذ', extra: ['T','B','N','D','P','X','A','K','F','G','H','J','Q','W'] },
        { answer: 'INFLUX MOTEUR', clue: 'message nerveux vers le muscle / رسالة عصبية نحو العضلة', extra: ['K','B','A','X','T','P'] },
        { answer: 'NERF MOTEUR', clue: 'conducteur de la motricité / ناقل الحركة', extra: ['X','K','B','A','T','P','D','F','G'] },
        { answer: 'VOLONTAIRE', clue: 'mouvement contrôlé par le cerveau / حركة يتحكم فيها الدماغ', extra: ['X','K','M','B','A','P','F','G'] },
        { answer: 'CONTRACTION', clue: 'réponse du muscle / استجابة العضلة', extra: ['X','K','M','B','A','P','D','F','G'] },
        { answer: 'HEMISPHERE', clue: 'moitié du cerveau / نصف الدماغ', extra: ['K','X','B','T','A','P','D','F','G'] },
        { answer: 'EFFECTEUR', clue: 'organe qui exécute le mouvement / العضو الذي ينفذ الحركة', extra: ['K','M','X','B','A','P','T'] },
        { answer: 'ROLANDO', clue: 'sillon du cerveau / ثلم الدماغ', extra: ['K','M','B','T','X','P','A','E','F','G','H','J','Q','W'] },
        { answer: 'CERVELET', clue: 'partie de l\'encéphale / جزء من الدماغ', extra: ['X','K','B','M','A','P','D','F','G'] }
    ],

    // المستوى 4: La motricité involontaire
    [
        { answer: 'REFLEXE', clue: 'mouvement involontaire / حركة لاإرادية', extra: ['M','T','A','P','W','K','B','D','F','G','H','J','Q'] },
        { answer: 'ARC REFLEXE', clue: 'trajet de l\'influx nerveux / مسار السيالة العصبية', extra: ['K','M','T','X','B','P','D','F','G'] },
        { answer: 'MOELLE EPINIERE', clue: 'centre du réflexe / مركز الانعكاس', extra: ['K','X','B','T','A','P','F','G'] },
        { answer: 'RACINE POSTERIEURE', clue: 'conduit l\'influx sensitif / تنقل السيالة الحسية', extra: ['X','K','M','B','T','F','G'] },
        { answer: 'RACINE ANTERIEURE', clue: 'conduit l\'influx moteur / تنقل السيالة الحركية', extra: ['X','K','M','B','T','P','D'] },
        { answer: 'GANGLION', clue: 'renflement de la racine postérieure / انتفاخ الجذر الخلفي', extra: ['K','M','X','B','T','P','A','D','F','G','H'] },
        { answer: 'NERF RACHIDIEN', clue: 'sort de la moelle épinière / يخرج من النخاع الشوكي', extra: ['X','K','M','B','T','P'] },
        { answer: 'RAPIDE', clue: 'caractéristique du réflexe / خاصية الانعكاس', extra: ['K','M','B','T','X','L','N','O','F','G','H','J','Q','W','Z'] },
        { answer: 'SPINALE', clue: 'relatif à la moelle épinière / متعلق بالنخاع الشوكي', extra: ['K','M','B','X','T','A','F','G','H','J','Q','W'] },
        { answer: 'INVOLONTAIRE', clue: 'sans intervention du cerveau / بدون تدخل الدماغ', extra: ['K','M','X','B','T','P','A','F','G'] }
    ],

    // المستوى 5: La structure du système nerveux
    [
        { answer: 'NEURONE', clue: 'unité du système nerveux / وحدة الجهاز العصبي', extra: ['X','B','L','K','A','T','M','P','D','F','G','H','J'] },
        { answer: 'CORPS CELLULAIRE', clue: 'partie du neurone avec le noyau / جزء العصبون مع النواة', extra: ['X','T','K','M','N','B'] },
        { answer: 'AXONE', clue: 'prolongement du neurone / امتداد العصبون', extra: ['R','T','M','L','P','K','B','D','F','G','H','J','Q','W','Z'] },
        { answer: 'ARBORISATION', clue: 'terminaison de l\'axone / نهاية المحور', extra: ['X','K','M','B','T','P','E','F','G'] },
        { answer: 'SYNAPSE', clue: 'zone de contact entre neurones / منطقة اتصال بين عصبونين', extra: ['K','L','M','T','X','B','D','F','G','H','J','Q','W'] },
        { answer: 'MATIERE GRISE', clue: 'contient les corps cellulaires / تحتوي على الأجسام الخلوية', extra: ['X','K','B','T','P','N'] },
        { answer: 'MATIERE BLANCHE', clue: 'contient les axones / تحتوي على المحاور', extra: ['X','K','T','P','B','G','F'] },
        { answer: 'ENCEPHALE', clue: 'cerveau + cervelet + bulbe / الدماغ + المخيخ + البصلة', extra: ['X','K','M','B','T','P','A','D','F','G'] },
        { answer: 'BULBE RACHIDIEN', clue: 'partie inférieure de l\'encéphale / الجزء السفلي من الدماغ', extra: ['X','K','M','T','P','A'] },
        { answer: 'FIBRE NERVEUSE', clue: 'axone entouré de myéline / محور محاط بالميالين', extra: ['X','T','K','M','L','P','A','B'] }
    ],

    // المستوى 6: Le système musculaire
    [
        { answer: 'FIBRE MUSCULAIRE', clue: 'unité du muscle / وحدة العضلة', extra: ['X','K','T','M','B','P','A'] },
        { answer: 'FAISCEAU', clue: 'groupe de fibres musculaires / مجموعة ألياف عضلية', extra: ['K','M','X','B','T','P','N','D','F','G','H'] },
        { answer: 'TENDON', clue: 'fixe le muscle sur l\'os / يثبت العضلة على العظم', extra: ['K','M','B','X','A','P','L','F','G','H','J','Q','W','Z'] },
        { answer: 'EXCITABILITE', clue: 'propriété du muscle / خاصية العضلة', extra: ['K','M','X','B','T','A','P'] },
        { answer: 'CONTRACTILITE', clue: 'capacité de se contracter / قدرة الانقباض', extra: ['X','K','M','B','A','P'] },
        { answer: 'ELASTICITE', clue: 'capacité de reprendre sa forme / قدرة استعادة الشكل', extra: ['X','K','M','B','T','P','A'] },
        { answer: 'PLAQUE MOTRICE', clue: 'jonction nerf-muscle / اتصال عصب-عضلة', extra: ['X','K','M','B','T','A','P','F','G'] },
        { answer: 'GLUCOSE', clue: 'nutriment du muscle / مغذي العضلة', extra: ['K','M','X','B','T','A','P','R','F','G','H','J','W'] },
        { answer: 'OXYGENE', clue: 'gaz nécessaire à la contraction / غاز ضروري للانقباض', extra: ['K','M','B','X','T','A','P','L','F','G'] },
        { answer: 'ANTAGONISTE', clue: 'muscles opposés / عضلات متعاكسة', extra: ['X','K','M','B','P','L','F','G'] }
    ],

    // المستوى 7: Les dangers
    [
        { answer: 'DOPAGE', clue: 'danger pour le système musculaire / خطر على الجهاز العضلي', extra: ['K','M','X','B','T','L','N','R','F','G','H','J','Q','W','Z'] },
        { answer: 'DROGUE', clue: 'substance toxique / مادة سامة', extra: ['K','M','X','B','T','A','P','L','N','F','G','H','J','Q'] },
        { answer: 'ALCOOL', clue: 'perturbe le système nerveux / يضطرب الجهاز العصبي', extra: ['K','M','X','B','T','P','R','D','F','G','H','J'] },
        { answer: 'LESION', clue: 'dommage du nerf ou muscle / ضرر للعصب أو العضلة', extra: ['K','M','X','B','T','A','P','D','F','G','H','J','Q','W'] },
        { answer: 'PARALYSIE', clue: 'perte de mouvement / فقدان الحركة', extra: ['K','M','X','B','T','D','F','G'] },
        { answer: 'DECHIRURE', clue: 'rupture des fibres musculaires / تمزق الألياف العضلية', extra: ['K','M','X','B','T','P','A','F','G'] },
        { answer: 'ELONGATION', clue: 'étirement excessif du muscle / تمدد مفرط للعضلة', extra: ['K','M','X','B','T','P','R','F','G'] },
        { answer: 'ECHAUFFEMENT', clue: 'prévention avant sport / الوقاية قبل الرياضة', extra: ['K','M','X','B','T','L','P'] },
        { answer: 'ENERGIE', clue: 'nécessaire pour la contraction musculaire / ضروري للانقباض العضلي', extra: ['K','M','X','B','T','A','P','L','F','G'] },
        { answer: 'FATIGUE', clue: 'état après effort prolongé / حالة بعد مجهود طويل', extra: ['K','M','X','B','P','L','N','R','D','H','J','Q','W','Z'] }
    ],

    // المستوى 8: Questions mixtes
    [
        { answer: 'ACETYLCHOLINE', clue: 'médiateur chimique / وسيط كيميائي', extra: ['K','M','X','B','T','P','D','F','G'] },
        { answer: 'AFFERENT', clue: 'influx nerveux sensitif / سيالة عصبية حسية', extra: ['K','M','X','B','T','P','L','G','H','J','Q'] },
        { answer: 'EFFERENT', clue: 'influx nerveux moteur / سيالة عصبية حركية', extra: ['K','M','X','B','T','A','P','L','G','H'] },
        { answer: 'CORTEX CEREBRAL', clue: 'surface du cerveau / سطح الدماغ', extra: ['X','K','M','B','T','P','F','G'] },
        { answer: 'MYOFIBRILLE', clue: 'filament dans la fibre musculaire / خيط في الليف العضلي', extra: ['X','K','T','A','P','D','F','G'] },
        { answer: 'SQUELETTIQUE', clue: 'type de muscle / نوع من العضلات', extra: ['X','K','M','B','T','A','P'] },
        { answer: 'PHOTORECEPTEUR', clue: 'récepteur de la lumière / مستقبل الضوء', extra: ['X','K','M','B','T','A'] },
        { answer: 'CORPS CELLULAIRE', clue: 'partie du neurone contenant le noyau / جزء العصبون يحتوي النواة', extra: ['X','K','M','B','T','A','P'] },
        { answer: 'PLURINUCLEE', clue: 'fibre musculaire avec plusieurs noyaux / ليف عضلي بعدة أنوية', extra: ['K','M','X','B','T','A'] },
        { answer: 'NERF OPTIQUE', clue: 'conducteur de la sensibilité visuelle / ناقل الحساسية البصرية', extra: ['K','M','X','B','T','A','L'] }
    ],

    // المستوى 9: Questions avancées
    [
        { answer: 'DECEREBRE', clue: 'grenouille sans cerveau / ضفدع بدون دماغ', extra: ['X','K','M','B','T','A','P','L','F','G'] },
        { answer: 'GRENOUILLE SPINALE', clue: 'grenouille avec moelle épinière intacte / ضفدع بنخاع شوكي سليم', extra: ['K','M','X','B','T','P'] },
        { answer: 'AXONE', clue: 'prolongement du neurone / امتداد العصبون', extra: ['K','M','B','T','L','P','D','F','G','H','J','Q','W','Z'] },
        { answer: 'NEUROTRANSMETTEUR', clue: 'médiateur chimique de la synapse / وسيط كيميائي للمشبك', extra: ['K','M','X','B','P','A'] },
        { answer: 'BICEPS', clue: 'muscle à deux ventres / عضلة بفصين', extra: ['K','M','X','T','A','L','N','O','D','F','G','H','J','Q','W','Z'] },
        { answer: 'TRICEPS', clue: 'muscle à trois ventres / عضلة بثلاث فصوص', extra: ['K','M','X','B','A','L','N','O','D','F','G','H','J','Q'] },
        { answer: 'SILLON', clue: 'rainure du cerveau / أخدود الدماغ', extra: ['K','M','X','B','T','A','P','E','F','G','H','J','Q'] },
        { answer: 'FUSIFORME', clue: 'forme de muscle / شكل العضلة', extra: ['K','M','X','B','T','A','P','L','D','G'] },
        { answer: 'CONVERGENT', clue: 'type de muscle court / نوع من العضلات القصيرة', extra: ['K','M','X','B','T','A','P'] },
        { answer: 'CONJONCTIF', clue: 'tissu qui entoure les faisceaux / نسيج يحيط بالحزم', extra: ['K','M','X','B','T','A','P'] }
    ],

    // المستوى 10: قيد الإعداد
    [
        { answer: 'NIVEAU', clue: 'المستوى 10 قيد الإعداد - سيتم إضافة أسئلة قريباً', extra: ['K','M','X','B','T','A','P','L','D','F','G','H','J','Q','W','Z'] },
        { answer: 'EN COURS', clue: 'المستوى 10 قيد الإعداد', extra: ['K','M','X','B','T','A','P','L','D','F','G','H','J','Q','W'] },
        { answer: 'BIENTOT', clue: 'المستوى 10 قيد الإعداد', extra: ['K','M','X','A','P','L','D','F','G','H','J','Q','W','Z'] },
        { answer: 'PREPARATION', clue: 'المستوى 10 قيد الإعداد', extra: ['K','M','X','B','T','L','D','F','G'] },
        { answer: 'QUESTIONS', clue: 'المستوى 10 قيد الإعداد', extra: ['K','M','X','B','T','A','P','L','D','F','G'] },
        { answer: 'PROCHAINEMENT', clue: 'المستوى 10 قيد الإعداد', extra: ['K','X','B','T','L'] },
        { answer: 'ATTENTE', clue: 'المستوى 10 قيد الإعداد', extra: ['K','M','X','B','L','P','D','F','G','H','J','Q','W','Z'] },
        { answer: 'RESERVE', clue: 'المستوى 10 قيد الإعداد', extra: ['K','M','X','B','T','A','P','L','D','F','G','H','J','Q'] },
        { answer: 'DEVELOPPEMENT', clue: 'المستوى 10 قيد الإعداد', extra: ['K','M','X','B','T','A'] },
        { answer: 'FUTUR', clue: 'المستوى 10 قيد الإعداد', extra: ['K','M','X','B','A','P','L','D','G','H','J','Q','W','Z'] }
    ]
];

// ---------- 3. بيانات الاختبارات المعرفية (fonctions de relation) ----------
const quizData = {
    easy: [
        {"question":"Quel organe fait partie du système nerveux central ?","options":["L'encéphale","Le muscle","L'os"],"answer":"L'encéphale"},
        {"question":"Quel est le rôle des récepteurs sensoriels dans la peau ?","options":["Produire le mouvement","Capter les stimulus extérieurs","Analyser les messages"],"answer":"Capter les stimulus extérieurs"},
        {"question":"Où naît l'influx nerveux moteur lors d'un mouvement volontaire ?","options":["Dans l'aire motrice","Dans la moelle épinière","Dans l'œil"],"answer":"Dans l'aire motrice"},
        {"question":"Le nerf sciatique est un conducteur :","options":["Uniquement sensitif","Uniquement moteur","Mixte"],"answer":"Mixte"},
        {"question":"Quel est le centre nerveux responsable des réflexes médullaires ?","options":["Le cerveau","La moelle épinière","Le cervelet"],"answer":"La moelle épinière"},
        {"question":"Comment appelle-t-on l'unité structurelle du système nerveux ?","options":["La fibre musculaire","Le neurone","Le tendon"],"answer":"Le neurone"},
        {"question":"Quelle est la propriété du muscle qui lui permet de se raccourcir ?","options":["L'élasticité","L'excitabilité","La contractilité"],"answer":"La contractilité"},
        {"question":"Le muscle squelettique est relié à l'os par :","options":["Les tendons","Les nerfs","Les vaisseaux"],"answer":"Les tendons"},
        {"question":"Quels sont les besoins de la contraction musculaire ?","options":["Glucose et Oxygène","CO2 et Eau","Graisse et Azote"],"answer":"Glucose et Oxygène"},
        {"question":"La zone de contact entre neurone et muscle est :","options":["L'aire de Broca","La plaque motrice","Le corps cellulaire"],"answer":"La plaque motrice"},
        {"question":"L'arc réflexe concerne quel type de mouvement ?","options":["Volontaire","Involontaire","Le sommeil"],"answer":"Involontaire"},
        {"question":"Quelle substance nuit gravement aux réflexes ?","options":["L'eau","Les vitamines","L'alcool"],"answer":"L'alcool"},
        {"question":"L'aire visuelle sert à :","options":["Entendre","Voir","Goûter"],"answer":"Voir"},
        {"question":"Une fibre musculaire est une :","options":["Cellule","Bactérie","Protéine"],"answer":"Cellule"},
        {"question":"L'influx nerveux sensitif se dirige vers :","options":["Les muscles","Les centres nerveux","La peau"],"answer":"Les centres nerveux"},
        {"question":"L'organe qui exécute le mouvement est :","options":["Le nerf","Le muscle","L'œil"],"answer":"Le muscle"},
        {"question":"La matière grise du cerveau est située en :","options":["Périphérie","Centre","Bas"],"answer":"Périphérie"},
        {"question":"Le stimulus de l'oreille est :","options":["La lumière","Le son","L'odeur"],"answer":"Le son"},
        {"question":"Le manque de sommeil fatigue quel système ?","options":["Nerveux","Digestif","Urinaire"],"answer":"Nerveux"},
        {"question":"Le cerveau est protégé par :","options":["Le crâne","La peau uniquement","Les muscles"],"answer":"Le crâne"}
    ],
    medium: [
        {"type":"QCM","question":"Le trajet de l'influx nerveux lors d'un réflexe médullaire est :","options":["Récepteur -> Moelle épinière -> Muscle","Récepteur -> Cerveau -> Muscle","Cerveau -> Moelle épinière -> Muscle"],"answer":"Récepteur -> Moelle épinière -> Muscle"},
        {"type":"QCM","question":"L'influx nerveux sensitif est qualifié de :","options":["Centrifuge (vers la périphérie)","Centripète (vers le centre)","Fixe"],"answer":"Centripète (vers le centre)"},
        {"type":"QCM","question":"La substance grise de la moelle épinière se trouve :","options":["En périphérie","Au centre (forme de H)","Partout"],"answer":"Au centre (forme de H)"},
        {"type":"QCM","question":"Les nerfs rachidiens sont fixés à la moelle épinière par :","options":["Une seule racine","Deux racines (antérieure et postérieure)","Trois racines"],"answer":"Deux racines (antérieure et postérieure)"},
        {"type":"QCM","question":"La racine postérieure du nerf rachidien contient :","options":["Uniquement des fibres motrices","Uniquement des fibres sensitives","Des fibres mixtes"],"answer":"Uniquement des fibres sensitives"},
        {"type":"QCM","question":"L'excitabilité d'un muscle est sa capacité à :","options":["Reprendre sa forme initiale","Réagir à un stimulus","Se contracter fortement"],"answer":"Réagir à un stimulus"},
        {"type":"QCM","question":"Lorsqu'on excite la racine antérieure d'un nerf rachidien, on observe :","options":["Une douleur","Une paralysie","Une contraction musculaire"],"answer":"Une contraction musculaire"},
        {"type":"QCM","question":"Qu'est-ce qu'une synapse ?","options":["Une cellule nerveuse","Une zone de contact entre deux neurones","Un muscle"],"answer":"Une zone de contact entre deux neurones"},
        {"type":"QCM","question":"Le message nerveux est de nature :","options":["Chimique uniquement","Électrique","Mécanique"],"answer":"Électrique"},
        {"type":"QCM","question":"L'élasticité musculaire est :","options":["Illimitée","Limitée","Absente chez l'homme"],"answer":"Limitée"},
        {"type":"QCM","question":"L'aire motrice se situe :","options":["En arrière du sillon de Rolando","En avant du sillon de Rolando","Dans le cervelet"],"answer":"En avant du sillon de Rolando"},
        {"type":"QCM","question":"Les muscles antagonistes sont des muscles qui :","options":["Agissent dans le même sens","Agissent en sens opposés","Ne travaillent jamais"],"answer":"Agissent en sens opposés"},
        {"type":"QCM","question":"Le corps cellulaire d'un neurone moteur se trouve dans :","options":["Le muscle","La substance grise","La substance blanche"],"answer":"La substance grise"},
        {"type":"QCM","question":"La plaque motrice libère une substance appelée :","options":["Hormone","Neurotransmetteur","Sang"],"answer":"Neurotransmetteur"},
        {"type":"QCM","question":"Le réflexe permet de :","options":["Réfléchir à une situation","Protéger l'organisme","Apprendre à lire"],"answer":"Protéger l'organisme"},
        {"type":"QCM","question":"Le neurone est composé d'un corps cellulaire, d'un axone et de dendrites.","options":["Vrai","Faux"],"answer":"Faux"},
        {"type":"QCM","question":"Les tendons sont extensibles comme les muscles.","options":["Vrai","Faux"],"answer":"Faux"},
        {"type":"QCM","question":"La matière blanche contient les corps cellulaires des neurones.","options":["Vrai","Faux"],"answer":"Faux"},
        {"type":"QCM","question":"Le muscle transforme l'énergie chimique en énergie mécanique.","options":["Vrai","Faux"],"answer":"Vrai"},
        {"type":"QCM","question":"L'arc réflexe nécessite l'intervention de l'aire motrice.","options":["Vrai","Faux"],"answer":"Faux"},
        {"type":"Matching","question":"Relier les organes à leurs rôles","left":["Moelle épinière","Aire visuelle","Nerf moteur"],"right":["Analyse de l'influx sensitif","Conducteur centrifuge","Centre du réflexe"],"pairs":{"Moelle épinière":"Centre du réflexe","Aire visuelle":"Analyse de l'influx sensitif","Nerf moteur":"Conducteur centrifuge"}},
        {"type":"Matching","question":"Relier les concepts aux définitions","left":["Neurone","Fibre musculaire","Synapse"],"right":["Cellule musculaire","Zone de communication","Cellule nerveuse"],"pairs":{"Neurone":"Cellule nerveuse","Fibre musculaire":"Cellule musculaire","Synapse":"Zone de communication"}},
        {"type":"Matching","question":"Relier les propriétés musculaires","left":["Se contracter","Réagir à un stimulus","Reprendre sa forme"],"right":["Excitabilité","Élasticité","Contractilité"],"pairs":{"Se contracter":"Contractilité","Réagir à un stimulus":"Excitabilité","Reprendre sa forme":"Élasticité"}},
        {"type":"Matching","question":"Relier les composants du système","left":["Encéphale","Système périphérique","Système central"],"right":["Encéphale + Moelle épinière","Cerveau + Cervelet + Bulbe","Les nerfs"],"pairs":{"Encéphale":"Cerveau + Cervelet + Bulbe","Système périphérique":"Les nerfs","Système central":"Encéphale + Moelle épinière"}},
        {"type":"Matching","question":"Relier les activités aux types de réponses","left":["Brûlure soudaine","Écrire un message","Entendre de la musique"],"right":["Sensibilité consciente","Réflexe","Motricité volontaire"],"pairs":{"Brûlure soudaine":"Réflexe","Écrire un message":"Motricité volontaire","Entendre de la musique":"Sensibilité consciente"}},
        {"type":"Ordering","question":"Ordonnez les éléments de la sensibilité visuelle :","items":["Le nerf optique","L'œil","L'aire visuelle"],"correctOrder":["L'œil","Le nerf optique","L'aire visuelle"]},
        {"type":"Ordering","question":"Ordonnez les éléments de la sensibilité générale (tactile) :","items":["L'aire tactile","La moelle épinière","Le nerf sensitif","La peau"],"correctOrder":["La peau","Le nerf sensitif","La moelle épinière","L'aire tactile"]},
        {"type":"Ordering","question":"Ordonnez les éléments du mouvement volontaire :","items":["Le muscle","L'aire motrice","La moelle épinière","Le nerf moteur"],"correctOrder":["L'aire motrice","La moelle épinière","Le nerf moteur","Le muscle"]},
        {"type":"Ordering","question":"Ordonnez les éléments de l'arc réflexe spinal :","items":["Le nerf sensitif","Le nerf moteur","Le muscle","La peau","La moelle épinière"],"correctOrder":["La peau","Le nerf sensitif","La moelle épinière","Le nerf moteur","Le muscle"]},
        {"type":"QCM","question":"Identifiez un danger menaçant l'intégrité du système musculaire :","options":["Les drogues","L'alcool","Le dopage"],"answer":"Le dopage"}
    ],
    hard: [
        {"type":"QCM","question":"Une section de la racine antérieure d'un nerf rachidien entraîne :","options":["Perte de sensibilité uniquement","Paralysie musculaire uniquement","Perte de sensibilité et de motricité"],"answer":"Paralysie musculaire uniquement"},
        {"type":"QCM","question":"L'aire motrice gauche contrôle :","options":["La partie droite du corps","La partie gauche du corps","Tout le corps"],"answer":"La partie droite du corps"},
        {"type":"QCM","question":"Le centre nerveux de la motricité volontaire est :","options":["La moelle épinière","L'aire motrice","Le muscle"],"answer":"L'aire motrice"},
        {"type":"QCM","question":"Lors de la flexion du bras :","options":["Biceps contracté, Triceps relâché","Biceps relâché, Triceps contracté","Les deux sont contractés"],"answer":"Biceps contracté, Triceps relâché"},
        {"type":"QCM","question":"Le rôle du nerf sensitif est :","options":["Conduire l'influx nerveux vers le centre","Conduire l'influx nerveux vers le muscle","Élaborer l'influx nerveux"],"answer":"Conduire l'influx nerveux vers le centre"},
        {"type":"QCM","question":"Le stimulus spécifique des photorécepteurs est :","options":["Le son","La lumière","La pression"],"answer":"La lumière"},
        {"type":"QCM","question":"L'unité structurelle et fonctionnelle des muscles est :","options":["Le faisceau musculaire","Le neurone","La fibre musculaire"],"answer":"La fibre musculaire"},
        {"type":"QCM","question":"Quels sont les besoins de la contraction musculaire ?","options":["CO2 et glucose","O2 et glucose","L'eau et glucose"],"answer":"O2 et glucose"},
        {"type":"QCM","question":"La synapse neuromusculaire est aussi appelée :","options":["Plaque motrice","Ganglion spinal","Corps cellulaire"],"answer":"Plaque motrice"},
        {"type":"QCM","question":"Que signifie un nerf 'mixte' ?","options":["Sensitif et moteur","Cerveau et moelle","Muscle et os"],"answer":"Sensitif et moteur"},
        {"type":"TrueFalse","question":"La substance blanche de la moelle épinière est située à l'extérieur de la substance grise.","answer":true},
        {"type":"TrueFalse","question":"L'élasticité du muscle squelettique est limitée.","answer":true},
        {"type":"TrueFalse","question":"Le neurone est l'unité structurelle et fonctionnelle du système nerveux.","answer":true},
        {"type":"TrueFalse","question":"L'influx nerveux moteur circule du centre vers les organes effecteurs.","answer":true},
        {"type":"TrueFalse","question":"Une fatigue musculaire prolongée peut mener à une déchirure.","answer":true},
        {"type":"TrueFalse","question":"L'arc réflexe nécessite l'intervention du cerveau.","answer":false},
        {"type":"TrueFalse","question":"Le réflexe médullaire nécessite l'intervention du cerveau.","answer":false},
        {"type":"TrueFalse","question":"Les tendons fixent le muscle sur l'os.","answer":true},
        {"type":"TrueFalse","question":"Le système nerveux central est protégé par le squelette.","answer":true},
        {"type":"TrueFalse","question":"Le neurone est formé d'un corps cellulaire, d'un axone et d'une arborisation terminale.","answer":true},
        {"type":"Ordering","question":"Ordonnez le trajet de l'influx nerveux dans une sensibilité consciente (vue) :","items":["Stimulus (Lumière)","Récepteur (Rétine)","Conducteur (Nerf optique)","Centre (Aire visuelle)"],"correctOrder":["Stimulus (Lumière)","Récepteur (Rétine)","Conducteur (Nerf optique)","Centre (Aire visuelle)"]},
        {"type":"Ordering","question":"Ordonnez les éléments de l'arc réflexe :","items":["Récepteur (peau)","Conducteur sensitif","Centre (moelle)","Conducteur moteur","Effecteur (muscle)"],"correctOrder":["Récepteur (peau)","Conducteur sensitif","Centre (moelle)","Conducteur moteur","Effecteur (muscle)"]},
        {"type":"Ordering","question":"Ordonnez les structures musculaires de la plus grande à la plus petite :","items":["Muscle","Faisceau de fibres","Fibre musculaire","Myofibrille"],"correctOrder":["Muscle","Faisceau de fibres","Fibre musculaire","Myofibrille"]},
        {"type":"Ordering","question":"Ordonnez les composants de l'encéphale du haut vers le bas :","items":["Cerveau","Cervelet","Bulbe rachidien"],"correctOrder":["Cerveau","Cervelet","Bulbe rachidien"]},
        {"type":"Labeling","question":"Nommez les 5 éléments de l'arc réflexe :","keywords":["récepteur","peau","sensitif","centre","moelle","moteur","effecteur","muscle"],"elements":["Récepteur","Conducteur sensitif","Centre (moelle)","Conducteur moteur","Effecteur"]},
        {"type":"Labeling","question":"Nommez les 3 parties principales du neurone :","keywords":["corps","cellulaire","axone","arborisation","terminale","dendrite"],"elements":["Corps cellulaire","Axone","Arborisation terminale"]},
        {"type":"Labeling","question":"Identifiez les 3 types de muscles dans le corps :","keywords":["squelettique","lisse","cardiaque","strié"],"elements":["Squelettique","Lisse","Cardiaque"]},
        {"type":"Labeling","question":"Nommez les 2 racines du nerf rachidien :","keywords":["antérieure","postérieure","motrice","sensitive","racine"],"elements":["Racine antérieure (motrice)","Racine postérieure (sensitive)"]},
        {"type":"Labeling","question":"Nommez 2 nutriments essentiels pour le muscle :","keywords":["glucose","oxygène","dioxygène","o2","énergie"],"elements":["Glucose","Dioxygène (O2)"]},
        {"type":"Mention","question":"Citez 3 constituants de l'encéphale :","keywords":["cerveau","cervelet","bulbe","tronc","cérébral"],"requiredCount":3},
        {"type":"Mention","question":"Citez 3 propriétés du muscle squelettique :","keywords":["excitabilité","contractilité","élasticité","extensibilité"],"requiredCount":3},
        {"type":"Mention","question":"Citez 2 substances chimiques qui perturbent la transmission nerveuse :","keywords":["alcool","drogue","nicotine","tabac","cannabis","stupéfiant"],"requiredCount":2},
        {"type":"Mention","question":"Citez 3 types de récepteurs sensoriels cutanés :","keywords":["thermorécepteur","mécanorécepteur","nocicepteur","douleur","chaleur","pression","toucher"],"requiredCount":3},
        {"type":"Mention","question":"Citez 2 fonctions de la moelle épinière :","keywords":["réflexe","centre","conducteur","message","transmission","influx"],"requiredCount":2},
        {"type":"DirectQuestion","question":"Expliquez le rôle des muscles antagonistes lors d'un mouvement.","keywords":["opposition","contracte","étire","agoniste","antagoniste","mouvement","articulation"],"requiredKeywords":3},
        {"type":"DirectQuestion","question":"Pourquoi une lésion de la moelle épinière peut-elle entraîner une paralysie des membres ?","keywords":["interrompt","transmission","influx","moteur","cerveau","muscle","lésion"],"requiredKeywords":3},
        {"type":"DirectQuestion","question":"Définissez la plaque motrice.","keywords":["synapse","jonction","neurone","moteur","fibre","musculaire","contact"],"requiredKeywords":3},
        {"type":"DirectQuestion","question":"Quel est l'effet de la consommation de drogues sur le temps de réaction ?","keywords":["augmente","ralentit","temps","réaction","perturbation","synapse","transmission"],"requiredKeywords":3},
        {"type":"DirectQuestion","question":"Comment le muscle produit-il l'énergie nécessaire à sa contraction ?","keywords":["oxydation","glucose","oxygène","énergie","chaleur","réaction","chimique"],"requiredKeywords":3}
    ]
};

// ---------- 4. بيانات اختبارات المناعة ----------
const immunologyQuizData = {
    easy: [
        {"question":"Les microbes sont des êtres vivants...","options":["visibles à l'œil nu","invisibles à l'œil nu, observables au microscope","visibles uniquement au microscope électronique"],"answer":"invisibles à l'œil nu, observables au microscope"},
        {"question":"Les micro-organismes sont présents...","options":["uniquement dans l'eau et le sol","uniquement dans l'air","partout : l'air, l'eau, le sol, la peau et les intestins"],"answer":"partout : l'air, l'eau, le sol, la peau et les intestins"},
        {"question":"Les bactéries sont des organismes...","options":["acellulaires sans noyau","unicellulaires sans vrai noyau","unicellulaires avec un vrai noyau"],"answer":"unicellulaires sans vrai noyau"},
        {"question":"Comment les bactéries se multiplient-elles ?","options":["par bourgeonnement","par sporulation","par division cellulaire"],"answer":"par division cellulaire"},
        {"question":"Les virus sont...","options":["des organismes unicellulaires utiles","des organismes acellulaires, parasites obligatoires","des champignons microscopiques"],"answer":"des organismes acellulaires, parasites obligatoires"},
        {"question":"Les levures se reproduisent par...","options":["bourgeonnement","sporulation","division cellulaire"],"answer":"bourgeonnement"},
        {"question":"Les moisissures se reproduisent par...","options":["bourgeonnement","division cellulaire","sporulation"],"answer":"sporulation"},
        {"question":"La toxine est une substance...","options":["produite par les virus","sécrétée par certaines bactéries pathogènes","fabriquée par les protozoaires"],"answer":"sécrétée par certaines bactéries pathogènes"},
        {"question":"Le rôle de la capsule chez les bactéries est de...","options":["produire des spores","permettre la division cellulaire","augmenter la virulence de la bactérie"],"answer":"augmenter la virulence de la bactérie"},
        {"question":"Les protozoaires sont des organismes...","options":["acellulaires sans noyau","unicellulaires avec un vrai noyau","pluricellulaires comme les champignons"],"answer":"unicellulaires avec un vrai noyau"},
        {"question":"La première ligne de défense de l'organisme est...","options":["les anticorps","les barrières naturelles (peau, muqueuses)","les lymphocytes"],"answer":"les barrières naturelles (peau, muqueuses)"},
        {"question":"La phagocytose est réalisée par...","options":["les lymphocytes","les phagocytes (globules blancs)","les globules rouges"],"answer":"les phagocytes (globules blancs)"},
        {"question":"Les anticorps sont produits par...","options":["les lymphocytes B","les lymphocytes T","les phagocytes"],"answer":"les lymphocytes B"},
        {"question":"La vaccination permet de...","options":["guérir une maladie déjà présente","prévenir une maladie future","tuer directement les microbes"],"answer":"prévenir une maladie future"},
        {"question":"L'immunité acquise est...","options":["présente dès la naissance","développée après contact avec un antigène","une propriété des phagocytes"],"answer":"développée après contact avec un antigène"},
        {"question":"Le VIH attaque principalement...","options":["les globules rouges","les lymphocytes T4","les bactéries"],"answer":"les lymphocytes T4"},
        {"question":"Une allergie est une réaction...","options":["normale du système immunitaire","exagérée du système immunitaire","absence de réaction immunitaire"],"answer":"exagérée du système immunitaire"},
        {"question":"La sérothérapie consiste à injecter...","options":["des vaccins","des anticorps déjà formés","des phagocytes"],"answer":"des anticorps déjà formés"},
        {"question":"Les globules blancs sont aussi appelés...","options":["érythrocytes","leucocytes","plaquettes"],"answer":"leucocytes"},
        {"question":"La mémoire immunitaire permet...","options":["d'oublier les infections passées","de réagir plus vite lors d'une 2ème infection","de produire plus de globules rouges"],"answer":"de réagir plus vite lors d'une 2ème infection"}
    ],
    medium: [],
    hard: []
};
