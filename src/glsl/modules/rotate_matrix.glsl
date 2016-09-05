#pragma glslify: rotateMatrixX = require(./rotate_matrix_x);
#pragma glslify: rotateMatrixY = require(./rotate_matrix_y);
#pragma glslify: rotateMatrixZ = require(./rotate_matrix_z);

mat4 rotateMatrix(float radian_x, float radian_y, float radian_z) {
  return rotateMatrixX(radian_x) * rotateMatrixY(radian_y) * rotateMatrixZ(radian_z);
}
#pragma glslify: export(rotateMatrix)
