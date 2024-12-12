import * as tf from '@tensorflow/tfjs';
import labels from '../model/gesture_labels.json';  // labels.json 파일 import

export class SignLanguageModel {
  constructor() {
    this.model = null;
    this.labels = labels; // labels.json의 데이터 사용
  }

  async loadModel() {
    try {
      // 모델 로드
      this.model = await tf.loadLayersModel('/model/gesture_model.json');
      console.log('모델 로드 완료');
      console.log('사용 가능한 레이블:', this.labels);
      return true;
    } catch (error) {
      console.error('모델 로드 실패:', error);
      return false;
    }
  }

  async predict(imageData) {
    if (!this.model) {
      throw new Error('모델이 로드되지 않았습니다.');
    }

    // 이미지 전처리
    const tensor = tf.tidy(() => {
      const img = tf.browser.fromPixels(imageData)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();
      return img.div(255.0);
    });

    try {
      const predictions = await this.model.predict(tensor).data();
      tensor.dispose();

      // 가장 높은 확률을 가진 클래스 찾기
      const maxProbability = Math.max(...predictions);
      const predictedClass = predictions.indexOf(maxProbability);

      return {
        label: this.labels[predictedClass],
        probability: maxProbability
      };
    } catch (error) {
      tensor.dispose();
      throw error;
    }
  }
} 