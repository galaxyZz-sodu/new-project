<template>
  <div class="hello">
    <button @click="koutu">抠图</button>
    <button @click="draw">画画</button>
    <button @click="erase">橡皮擦</button>
    <button @click="changeBlack">切黑</button>
    <button @click="clear">清空画布</button>
    {{historyList.length === 0}}
    <button @click="backHistory" :disabled="historyList.length <= 1 || (historyIndex <= 0 ? isUseHistory : false)" >回退历史</button>
    <button @click="goHistory" :disabled="!isUseHistory || historyList.length - 1 === historyIndex" >前进历史</button>
    <!-- <button @click="resetRem(40)">bian</button> -->
    <div class="now-write">
        <canvas
          id="write"
          style="border: 1px solid #ccc;"
        >

        </canvas>
    </div>
    <div class="kou">
      <canvas
          id="kou"
          style="border: 1px solid #ccc;"
        >

        </canvas>
    </div>
    <div class="back">
      <canvas
          id="write"
          style="border: 1px solid #ccc;"
        >

        </canvas>
    </div>
  </div>
</template>

<script setup>
import { fabric } from 'fabric'
import { onMounted, ref, reactive } from "vue";

let canvasWriter = ref({});

let canvasWriterKou = reactive({});

let base64 = ref('');

let historyList = ref([]);

let isUseHistory = ref(false);

let historyIndex = ref(0);

const changeBlack = () => {
  console.log(canvasWriterKou.value.backgroundColor, 'canvasWriterKou.value.backgroundColor');
  if (canvasWriterKou.value.backgroundColor === '#ccc') {
    canvasWriterKou.value.backgroundColor = 'black'
  } else {
    canvasWriterKou.value.backgroundColor = '#ccc'
  }
}

const clearHistory = () => {
  historyList.value = new Array();
  isUseHistory.value = false;
  historyIndex.value = 0;
}

const backHistory = () => {
  if (!isUseHistory.value) {
    historyIndex.value = historyList.value.length - 1;

  }
  historyIndex.value -= 1;
  addImgtoWrite(historyList.value[historyIndex.value]);
  console.log(historyIndex.value, 'indexx');
  isUseHistory.value = true;
}

const goHistory = () => {
  historyIndex.value += 1;
  addImgtoWrite(historyList.value[historyIndex.value]);
}

const addImgtoWrite = (koutuImg) => {
  new fabric.Image.fromURL(koutuImg, (img) => {
    canvasWriter.value.clear();
    canvasWriter.value.add(img)
  })
}

const clear = () => {
  clearHistory();
  canvasWriter.value.clear();
}

const draw = () => {
  canvasWriter.value.isDrawingMode = !canvasWriter.value.isDrawingMode;
}

const erase = () => {
  canvasWriter.value.freeDrawingBrush = new fabric.EraserBrush(canvasWriter.value) // 使用橡皮擦画笔
  canvasWriter.value.freeDrawingBrush.width = 10 // 设置画笔粗细为 10
}

const initKou = () => {
  console.log('xox');
  canvasWriterKou.value = new fabric.Canvas('kou', {
    // fill: "green",
    backgroundColor: 'black',
    // selectionLineWidth: 2,
    width: 700,
    height: 500,
    // isDrawingMode: true,
  });

}

const initWriteBoard = () => {
  console.log('xox');
  canvasWriter.value = new fabric.Canvas('write', {
    // fill: "green",
    backgroundColor: 'white',
    // selectionLineWidth: 2,
    width: 700,
    height: 500,
    isDrawingMode: true,
    Selection: false,
  });

  canvasWriter.value.freeDrawingBrush.color = '#000';
  // canvasWriter.value.freeDrawingBrush.width = 5;
  canvasWriter.value.freeDrawingBrush.width = 10
  canvasWriter.value.freeDrawingBrush.color = 'black';

  canvasWriter.value.on("mouse:up", (options) => {
      setTimeout(() => {
      const nowHistoryBase64 = canvasWriter.value.toDataURL({
        format: 'image/png',
        quality: 1,
      });
      if (isUseHistory.value) {
        historyList.value.splice(historyIndex.value + 1)
        isUseHistory.value = false;
      }
      historyList.value.push(nowHistoryBase64);
      console.log(historyList.value, options);
    }, 10)

    
});
}

const koutu = async () => {
  base64.value = canvasWriter.value.toDataURL({
    format: 'image/png',
    quality: 1,
  })
  let koutuImg = await transparentImg(base64.value);
  addImgtoKou(koutuImg);
  // canvasWriterKou.value.add(koutuImg);
  console.log(koutuImg, 'kout');
}



const addImgtoKou = (koutuImg) => {
  new fabric.Image.fromURL(koutuImg, (img) => {
    // canvasWriterKou.value.contextContainer.globalCompositeOperation = 'source-in';
    // canvasWriterKou.value.clear();
    canvasWriterKou.value.add(img)
    // canvasWriterKou.value.contextContainer.globalCompositeOperation = 'source-over';
  })
}

const transparentImg = (base64) => {
  let imgHandler = document.createElement('canvas')
  let img = new Image();
  let imgHandlerCtx = imgHandler.getContext('2d');
  img.src = base64;
  let imgArr = [];
  let resImgArr = [];
  return new Promise((resolve, reject) => {
    try {
      img.onload = () => {
        imgHandler.width = img.width;
        imgHandler.height = img.height;
        imgHandlerCtx.drawImage(img, 0, 0);
        // imgHandlerCtx.imageSmoothingEnabled = true;
        // imgHandlerCtx.imageSmoothingQuality = 'high';
        imgArr = imgHandlerCtx.getImageData(0, 0, img.width, img.height).data;
        autoTransparentImg(imgArr, resImgArr, imgHandlerCtx, img);
        resolve(imgHandler.toDataURL());
      }
    } catch (e) {
      reject(e);
    }
  
  })
}

const autoTransparentImg = (imgArr, resImgArr, imgHandlerCtx, img) => {
  if (imgArr.length === 0) return;
  if (resImgArr.length === 0) {
    resImgArr = imgArr.slice(0);
  }

  // for (let pos = img.width * img.height * 4 - 4; pos >= 0; pos -= 4) {
  //   handleGray(pos, resImgArr);
  // }
  for (let pos = 0; pos < img.width * img.height * 4; pos += 4) {
    handleGray(pos, resImgArr);
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(img.width, img.height);
  imgData.data.set(resImgArr)
  imgHandlerCtx.putImageData(imgData, 0, 0);
}

const handleGray = (pos, resImgArr) => {
  const [r0, g0, b0] = [255, 255, 255];

  const r = resImgArr[pos];
  const g = resImgArr[pos + 1];
  const b = resImgArr[pos + 2];

  const gray = Math.sqrt((r - r0) ** 2) * 0.3 + Math.sqrt((g - g0) ** 2) * 0.59 + Math.sqrt((b - b0) ** 2) * 0.11;

  if (gray <= 60) {
    resImgArr[pos + 3] = 0;
  }
}


onMounted(() => {
  initWriteBoard();
  initKou();
})
</script>

<style scoped>

</style>