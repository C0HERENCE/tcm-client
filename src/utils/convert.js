import store from '../store'

export function symptomConvert(es) {
    console.log(es)
    console.log(es.preventiveNursing)
    return {
        0: {
            id: es.id, // id
            introduction: es.introduction, // 介绍
            chineseName: es.chineseName, // 中文名称
            englishName: es.englishName, // 英文名称
            otherName: es.otherName, // 其他名称
            inheritance: es.inheritance, // 遗传性
            latinName: es.latinName, // 拉丁名称
            parts: es.parts, // 发病部位
            medicalInsurance: es.medicalInsurance, // 医疗保险
            mainCauses: es.mainCauses, // 主要病因
            importantReminder: es.importantReminder, // 重要提醒
            inspectionItem: es.inspectionItem, // 检查项目
            commonSymptom: es.commonSymptom, // 常见症状,
            thumbnail: es.thumbnail ? es.thumbnail : require('../assets/thumbzz.jpg'),
        },
        1: {
            infectivityText: es.infectivityText, // 传染性
            morbidity: es.morbidity, // 发病率
            multiplePopulation: es.multiplePopulation, // 发病人群
        },
        2: {
            pathogenesisIntro: es.pathogenesisIntro, // 病因综述
            etiologyPathogenesis: es.etiologyPathogenesis // 病因
        },
        3: {
            symptomIntro: es.symptomIntro, // 症状综述
            symptom: es.symptom, // 症状
            accompanySymptom: es.accompanySymptom, // 伴随症状
            preventionTreatment: es.preventionTreatment, // 并发症状
        },
        4: {
            expectedInspection: es.expectedInspection,// 问诊
            physicalExamination: es.physicalExamination, // 身体检查
            laboratoryExamination: es.laboratoryExamination, // 实验室检查
            imagingExamination: es.imagingExamination, // 影像学检查
            otherCheck: es.otherCheck, // 其他检查
        },
        5: {
            diagnosisBasis: es.diagnosisBasis, // 诊断综述
            differentialDiagnosis: es.differentialDiagnosis // 诊断鉴别
        },
        6: {
            treatmentPrognosis: es.treatmentPrognosis, // 治疗综述
            generalTreatment: es.generalTreatment, // 常规治疗
            drugTherapy: es.drugTherapy, // 药物治疗
            relatedDrug: es.relatedDrug, // 相关药品
            otherTreatment: es.otherTreatment, // 其他治疗
            treatmentCycle: es.treatmentCycle, // 治疗周期
            treatmentCost: es.treatmentCost, // 治疗花费
        },
        7: {
            generalNursing: es.generalNursing, // 通用护理
            harm: es.harm, // 危害性
            selfHealing: es.selfHealing, // 自愈性
            cure: es.cure, // 治愈性
            cureRate: es.cureRate, // 治愈率
            radical: es.radical, // 传染性
            recidivity: es.recidivity, // x
            lifeCycle: es.lifeCycle, // 疾病周期
        },
        8: {
            everydayIntro: es.everydayIntro, // 日常护理
            mentalNursing: es.mentalNursing, // 心理护理
            medicationCare: es.medicationCare, // 药物护理
            lifeManagement: es.lifeManagement, // 终身护理
            illnessMonitoring: es.illnessMonitoring, // 疾病监测
            subsequentVisit: es.subsequentVisit, // 访问护理
        },
        9: {
            dietaryConditioning: es.dietaryConditioning, // 饮食条件
            dietSuggestion: es.dietSuggestion, // 饮食建议
            foodProhibition: es.foodProhibition, // 食物禁忌
        },
        10: {
            preventionMeasures: es.preventionMeasures // 预防手段
        }
    }
}

export function symptomString(key) {
    let xx = {}
    if (store.state.app.lang === 'zh-CN') {
        xx = {
            '0': '',
            '1': '流行病学',
            '2': '病因',
            '3': '症状',
            '4': '检查',
            '5': '诊断',
            '6': '治疗',
            '7': '预后',
            '8': '日常',
            '9': '饮食',
            '10': '预防',
            id: '编号',
            introduction: '介绍',
            chineseName: '中文名称',
            englishName: '英文名称',
            otherName: '其他名称',
            inheritance: '遗传性',
            latinName: '拉丁名称',
            parts: '发病部位',
            medicalInsurance: '医疗保险',
            mainCauses: '主要病因',
            importantReminder: '重要提醒',
            inspectionItem: '检查项目',
            commonSymptom: '常见症状',
            infectivityText: '传染性',
            morbidity: '发病率',
            multiplePopulation: '发病人群',
            pathogenesisIntro: '病因综述',
            etiologyPathogenesis: '病因',
            symptomIntro: '症状综述',
            symptom: '症状',
            accompanySymptom: '伴随症状',
            preventionTreatment: '并发症状',
            expectedInspection: '问诊',
            physicalExamination: '身体检查',
            laboratoryExamination: '实验室检查',
            imagingExamination: '影像学检查',
            otherCheck: '其他检查',
            diagnosisBasis: '诊断综述',
            differentialDiagnosis: '诊断鉴别',
            treatmentPrognosis: '治疗综述',
            generalTreatment: '常规治疗',
            drugTherapy: '药物治疗',
            relatedDrug: '相关药品',
            otherTreatment: '其他治疗',
            treatmentCycle: '治疗周期',
            treatmentCost: '治疗花费',
            generalNursing: '通用护理',
            harm: '危害性',
            selfHealing: '自愈性',
            cure: '治愈性',
            cureRate: '治愈率',
            radical: '传染性',
            recidivity: '复发性',
            lifeCycle: '疾病周期',
            everydayIntro: '日常护理',
            mentalNursing: '心理护理',
            medicationCare: '药物护理',
            lifeManagement: '终身护理',
            illnessMonitoring: '疾病监测',
            subsequentVisit: '访问护理',
            dietaryConditioning: '饮食条件',
            dietSuggestion: '饮食建议',
            foodProhibition: '食物禁忌',
            preventionMeasures: '预防手段',
        }
    } else {
        xx = {
            '0': '',
            '1': 'Epidemiology',
            '2': 'Cause',
            '3': 'Symptom',
            '4': 'Examination ',
            '5': 'Diagnosis',
            '6': 'Treatment',
            '7': 'Prognosis',
            '8': 'Daily',
            '9': 'Diet',
            '10': 'Prevention',
            id: 'id',
            introduction: 'introduction',
            chineseName: 'chineseName',
            englishName: 'englishName',
            otherName: 'otherName',
            inheritance: 'inheritance',
            latinName: 'latinName',
            parts: 'parts',
            medicalInsurance: 'medicalInsurance',
            mainCauses: 'mainCauses',
            importantReminder: 'importantReminder',
            inspectionItem: 'inspectionItem',
            commonSymptom: 'commonSymptom',
            infectivityText: 'infectivityText',
            morbidity: 'morbidity',
            multiplePopulation: 'multiplePopulation',
            pathogenesisIntro: 'pathogenesisIntro',
            etiologyPathogenesis: 'etiologyPathogenesis',
            symptomIntro: 'symptomIntro',
            symptom: 'symptom',
            accompanySymptom: 'accompanySymptom',
            preventionTreatment: 'preventionTreatment',
            expectedInspection: 'expectedInspection',
            physicalExamination: 'physicalExamination',
            laboratoryExamination: 'laboratoryExamination',
            imagingExamination: 'imagingExamination',
            otherCheck: 'otherCheck',
            diagnosisBasis: 'diagnosisBasis',
            differentialDiagnosis: 'differentialDiagnosis',
            treatmentPrognosis: 'treatmentPrognosis',
            generalTreatment: 'generalTreatment',
            drugTherapy: 'drugTherapy',
            relatedDrug: 'relatedDrug',
            otherTreatment: 'otherTreatment',
            treatmentCycle: 'treatmentCycle',
            treatmentCost: 'treatmentCost',
            generalNursing: 'generalNursing:',
            harm: 'harm',
            selfHealing: 'selfHealing',
            cure: 'cure',
            cureRate: 'cureRate',
            radical: 'radical',
            recidivity: 'recidivity',
            lifeCycle: 'lifeCycle',
            everydayIntro: 'everydayIntro',
            mentalNursing: 'mentalNursing',
            medicationCare: 'medicationCare',
            lifeManagement: 'lifeManagement',
            illnessMonitoring: 'illnessMonitoring',
            subsequentVisit: 'subsequentVisit',
            dietaryConditioning: 'dietaryConditioning',
            dietSuggestion: 'dietSuggestion',
            foodProhibition: 'foodProhibition',
            preventionMeasures: 'preventionMeasures',
        }
    }
        return xx[key];
}

export function herbString(key) {
    const xx = {
        "0": '简介',
        "1": '功效作用',
        "2": '临床应用',
        "3": '加工炮制',
        "4": '保存方法',
        "5": '药材鉴别',
        "6": '植物学信息',
        id: "id", // id
        chineseName: "中文名称", // 中文名
        chinesePinyin: "拼音", // 拼音
        latinName: "英文",
        intro: "介绍",
        thumbnail: "封面",
        picturepath: "图片",
        aliasName: "别名",
        cmedicaltype: "中医药类型",
        origin: "来源",
        phylum: "门",
        classify: "种",
        catalogue: "目",
        family: "纲",
        genus: "种",
        species: '种群',
        remark: '性味归经',
        toxicity: '毒性',
        msgTypeContent: '种类',
        herbalPiecesName: '草药名',
        healthType: '医保信息',
        statement: '相关论述',
        function: '功效作用',
        func: '功能',
        mainAttend: '主治',
        dosage: '用法用量',
        adverseReactions: '不良反应',
        taboo: '禁忌',
        notice: '注意事项',
        chemicalComposition: '化学成分',
        pharmacology: '药理作用',
        toxicologicalEffects: '毒理作用',
        relatedDiscussion: '相关论述',
        notes: '附注',
        clinicalApplication: '临床应用',
        configuration: '相关配伍',
        identifyMedication: '鉴别用药',
        relatedDrug: '相关药品',
        relatedPrescription: '相关方剂',
        dietGuidelines: '药膳食疗',
        process: '加工炮制',
        harvestProcess: '采收加工',
        processing: '炮制方法',
        storageMethod: '保存方法',
        medicineIdentify: '药材鉴别',
        identify: '鉴别',
        medicinalProperty: '药材性状',
        decoctionPiecesCharacter: '饮片性状',
        comCounterfeit: '常见伪品',
        plant: '植物学信息',
        plantGenus: '植物种属',
        plantFrature: '形态特征',
        plantCropArea: '分布区域',
        plantRealEstate: '道地产区',
        plantGrowthEnvironment: '生长环境',
        plantGrowthHabits: '生长见习',
        plantsireMethods: '繁殖方式',
        plantTrainTechniques: '栽培技术',
        plantPestControl: '病虫防治',
        plantMajorVariant: '主要变种',
    }
    const yy = {
        "0": 'Introduction',
        "1": 'Function',
        "2": 'Clinical Application',
        "3": 'Processing',
        "4": 'Save Methods',
        "5": 'Classification',
        "6": 'Plant',
        id: "id", // id
        chineseName: "chineseName", // 中文名
        chinesePinyin: "chinesePinyin", // 拼音
        latinName: "latinName",
        intro: "intro",
        thumbnail: "thumbnail",
        picturepath: "picturepath",
        aliasName: "aliasName",
        cmedicaltype: "cmedicaltype",
        origin: "origin",
        phylum: "门",
        classify: "classify",
        catalogue: "catalogue",
        family: "family",
        genus: "genus",
        species: 'species',
        remark: 'remark',
        toxicity: 'toxicity',
        msgTypeContent: 'msgTypeContent',
        herbalPiecesName: 'herbalPiecesName',
        healthType: 'healthType',
        statement: 'statement',
        function: 'function',
        func: 'func',
        mainAttend: 'mainAttend',
        dosage: 'dosage',
        adverseReactions: 'adverseReactions',
        taboo: 'taboo',
        notice: 'notice',
        chemicalComposition: 'chemicalComposition',
        pharmacology: 'pharmacology',
        toxicologicalEffects: 'toxicologicalEffects',
        relatedDiscussion: 'relatedDiscussion',
        notes: 'notes',
        clinicalApplication: 'clinicalApplication',
        configuration: 'configuration',
        identifyMedication: 'identifyMedication',
        relatedDrug: 'relatedDrug',
        relatedPrescription: 'relatedPrescription',
        dietGuidelines: 'dietGuidelines',
        process: 'process',
        harvestProcess: 'harvestProcess',
        processing: 'processing',
        storageMethod: 'storageMethod',
        medicineIdentify: 'medicineIdentify',
        identify: 'identify',
        medicinalProperty: 'medicinalProperty',
        decoctionPiecesCharacter: 'decoctionPiecesCharacter',
        comCounterfeit: 'comCounterfeit',
        plant: 'plant',
        plantGenus: 'plantGenus',
        plantFrature: 'plantFrature',
        plantCropArea: 'plantCropArea',
        plantRealEstate: 'plantRealEstate',
        plantGrowthEnvironment: 'plantGrowthEnvironment',
        plantGrowthHabits: 'plantGrowthHabits',
        plantsireMethods: 'plantsireMethods',
        plantTrainTechniques: 'plantTrainTechniques',
        plantPestControl: 'plantPestControl',
        plantMajorVariant: 'plantMajorVariant',
    }
    if (store.state.app.lang == 'zh-CN')
        return xx[key];
    else
        return yy[key];
}

export function prescriptionString(key) {
    let xx = {
        '0': '简介',
        '1': '主要功效',
        '2': '方义组成',
        '3': '配伍',
        '4': '备注事项',
        "name": '名字',
        "thumb": '插图',
        "intro": '介绍',
        "alias": '别名',
        "provenance": '出处',
        "classification": '分类',
        "jfunction": '功用',
        "jattending": '主治',
        "rhymeFormulas": '歌诀',
        "usage": '用法用量',
        "zcomposition": '组成',
        "jcomposition": '组成',
        "fangyi": '方义',
        "comFeatures": '配伍特点',
        "zfunction": '功用',
        "apply": '运用',
        "zattending": '主治',
        "cut": '加减化裁',
        "useAttention": '使用注意',
        "note": '附注',
        "abstracts": '重要文献',
    }
    let yy = {
        '0': 'Introduction',
        '1': 'Main Function',
        '2': 'Composition',
        '3': 'Compatibility',
        '4': 'Note',
        "name": 'Name',
        "thumb": 'Picture',
        "intro": 'Introduction',
        "alias": 'Alias Name',
        "provenance": 'Provenance',
        "classification": 'Classification',
        "jfunction": 'Function',
        "jattending": 'Attending',
        "rhymeFormulas": 'RhymeFormulas',
        "usage": 'Usage',
        "zcomposition": 'Detail Composition',
        "jcomposition": 'Composition',
        "fangyi": 'Fang yi',
        "comFeatures": 'Composition Features',
        "zfunction": 'Detail Function',
        "apply": 'Apply',
        "zattending": 'Detail Attending',
        "cut": 'Cut',
        "useAttention": 'Use Attention',
        "note": 'Notes',
        "abstracts": 'Abstracts',
    }
    if (store.state.app.lang === 'zh-CN') {
        return xx[key]
    } else {
        return yy[key]
    }
}

export function herbConvert(herb) {
    return {
        0: {
            id: herb.id, // id
            chineseName: herb.chinesename, // 中文名
            chinesePinyin: herb.chinesepinyin, // 拼音
            latinName: herb.latinname,
            intro: herb.intro,
            thumbnail: herb.thumbnail ? herb.thumbnail : require('../assets/thumbzyc.jpg'),
            picturepath: herb.picturepath ? herb.picturepath : require('../assets/thumbzyc.jpg'),
            aliasName: herb.aliasname,
            cmedicaltype: herb.cmedicaltype,
            origin: herb.origin,
            phylum: herb.phylum,
            classify: herb.classify,
            catalogue: herb.catalogue,
            family: herb.family,
            genus: herb.genus,
            species: herb.species,
            remark: herb.remark,
            toxicity: herb.toxicity,
            msgTypeContent: herb.msgtypecontent,
            herbalPiecesName: herb.herbalpiecesName,
            healthType: herb.healthtype,
            statement: herb.statement,
        },
        1: {
            func: herb.func,
            mainAttend: herb.mainattend,
            dosage: herb.dosage,
            adverseReactions: herb.adversereactions,
            taboo: herb.taboo,
            notice: herb.notice,
            chemicalComposition: herb.chemicalcomposition,
            pharmacology: herb.pharmacology,
            toxicologicalEffects: herb.toxicologicaleffects,
            relatedDiscussion: herb.relateddiscussion,
            notes: herb.notes,
        },
        2: {
            clinicalApplication: herb.clinicalapplication,
            configuration: herb.configuration,
            identifyMedication: herb.identifymedication,
            relatedDrug: herb.relateddrug,
            relatedPrescription: herb.relatedprescription,
        },
        3: {
            harvestProcess: herb.harvestprocess,
            processing: herb.processing,
        },
        4: {
            storageMethod: herb.storagemethod
        },
        5: {
            identify: herb.identify,
            medicinalProperty: herb.medicinalproperty,
            decoctionPiecesCharacter: herb.decoctionpiecescharacter,
            comCounterfeit: herb.comCounterfeit,
        },
        6: {
            plantGenus: herb.plantgenus,
            plantFrature: herb.plantfrature,
            plantCropArea: herb.plantcropArea,
            plantRealEstate: herb.plantrealestate,
            plantGrowthEnvironment: herb.plantgrowthenvironment,
            plantGrowthHabits: herb.plantgrowthhabits,
            plantsireMethods: herb.plantsireMethods,
            plantTrainTechniques: herb.planttraitechniques,
            plantPestControl: herb.plantpestcontrol,
            plantMajorVariant: herb.planmajorvriant,
        },
    }
}

export function prescriptionConvert(es) {
    return {
        0: {
            "id": es.id,
            "name": es.name, // 名字
            "thumb": es.thumb ? es.thumb : require('../assets/thumbzyc.jpg'),
            "intro": es.intro, // 介绍
            "alias": es.alias, // 别名
            "provenance": es.provenance, // 出处
            "classification": es.classification, // 分类
            "jfunction": es.jfunction, // 功用
            "jattending": es.jattending, // 主治
            "jcomposition": es.jcomposition, // 组成
        },
        1: {
            "zfunction": es.zfunction, // 功用
            "apply": es.apply, // 运用
            "zattending": es.zattending, // 主治
            "rhymeFormulas": es.rhymeFormulas, // 歌诀
        },
        2: {
            "fangyi": es.fangyi, // 方义
            "usage": es.usage, // 用法用量
            "zcomposition": es.zcomposition, // 组成
            "cut": es.cut, // 加减化裁
        },
        3: {
            "comFeatures": es.comFeatures, // 配伍特点
            "abstracts": es.abstracts, // 重要文献
        },
        4: {
            "useAttention": es.useAttention, // 使用注意
            "note": es.note, // 附注
        },
    }
}

export function searchResultConvert(s) {
    if (s.type === "disease") {
        return {
            id: s.id,
            pic: s.thumbnail ? s.thumbnail : require('../assets/thumbzz.jpg'),
            name: s.chineseName,
            englishName: s.englishName,
            nameHigh: s.highlighter.chineseName ? s.highlighter.chineseName[0] : s.chineseName + "- 疾病症状",
            intro: s.introduction,
            url: "/knowledge/symptom/" + s.id
        }
    } else if (s.type === "prescriptions") {
        return {
            id: s.id,
            pic: s.thumb ? s.thumb : require('../assets/thumbzyc.jpg'),
            name: s.name,
            englishName: s.name,
            nameHigh: s.highlighter.name ? s.highlighter.name[0] : s.name + "- 中药方剂",
            intro: s.intro,
            url: "/knowledge/prescription/" + s.id
        }
    } else if (s.type === "herbs_info_v2") {
        console.log(s)
        return {
            id: s.id,
            pic: s.picturepath ? s.picturepath : require('../assets/thumbzyc.jpg'),
            name: s.chinesename,
            nameHigh: s.highlighter.chinesename ? s.highlighter.chinesename[0] : s.chinesename + "- 中药材",
            intro: s.intro,
            url: "/knowledge/herb/" + s.id

        }
    } else {
        return s;
    }
}