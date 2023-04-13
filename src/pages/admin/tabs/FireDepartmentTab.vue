<template>
  <div>
    <div class="flex justify-end">
      <md-filled-button label="Fire Departments">
        <md-icon slot="icon">add</md-icon>
      </md-filled-button>
    </div>

    <div class="table">
      <table>
        <thead>
          <th>Name</th>
          <th>Phone</th>
          <th>Location Name</th>
          <th>Coordinates</th>
        </thead>
        <tbody>
          <tr>
            <td>Cebu City Fire Station</td>
            <td>(032) 261-8531</td>
            <td>N. Bacalso Avenue, Cebu City, Cebu</td>
            <td>10.2968531, 123.8834607</td>
          </tr>
          <tr>
            <td>Mandaue City Fire Station</td>
            <td>(032) 230-3325</td>
            <td>Plaridel St, Mandaue City, Cebu</td>
            <td>10.325453, 123.9337682</td>
          </tr>
          <tr>
            <td>Consolacion Fire Station</td>
            <td>(032) 564-2636</td>
            <td>Consolacion, Cebu</td>
            <td>10.3688478, 123.9528492</td>
          </tr>
          <tr>
            <td>Talisay City Fire Station</td>
            <td>(032) 272-3333</td>
            <td>Talisay City, Cebu</td>
            <td>10.238755, 123.8485587</td>
          </tr>
          <tr>
            <td>Danao City Fire Station</td>
            <td>(032) 200-3574</td>
            <td>Danao City, Cebu</td>
            <td>10.5258448, 124.0121664</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/button/filled-button";
</script>