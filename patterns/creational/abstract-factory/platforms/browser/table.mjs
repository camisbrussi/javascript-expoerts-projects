import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);
    document.body.insertAdjacentHTML("afterbegin", template);
  }

  prepareData(data) {
    const [firstItem] = data;
    const headers = Object.keys(firstItem);
    const tHeaders = headers.map(header => `<th scope="col">${header}</th>`).join('');

    const tBodyValues = data
      .map(item => headers.map(header => `<td>${item[header]}</td>`))
      .map(tds => `<tr>${tds.join('')}</tr>`)
      .join('');

    const template = `
      <table class="table">
        <thead>
          <tr>${tHeaders}</tr>
        </thead>
        <tbody>
          ${tBodyValues}
        </tbody>
      </table>
    `;

    return template;
  }
}