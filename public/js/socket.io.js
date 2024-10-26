const socket = io();

socket.on("SERVER_UPDATE_SEEDERS", (data) => {
  const fileTable = document.querySelector("[file-table]");
  const infoHash = data.infoHash;
  const seedersNum = data.seeders.length || [].length;

  if (fileTable) {
    const fileSeeders = fileTable.querySelector(
      `tr[file-id="${infoHash}"] td[seeders]`
    );
    fileSeeders.innerHTML = seedersNum;
  }
});

socket.on("SERVER_CANCEL_SEEDERS", (data) => {
  const listCancelFile = data;
  const fileTable = document.querySelector("[file-table]");

  if (fileTable) {
    listCancelFile.forEach((file) => {
      const infoHash = file.infoHash;
      const seedersNum = file.seeders.length;
      const fileSeeders = fileTable.querySelector(
        `tr[file-id="${infoHash}"] td[seeders]`
      );
      fileSeeders.innerHTML = seedersNum;
    });
  }
});

socket.on("SERVER_UPDATE_NEW_FILE", (data) => {
  const fileTable = document.querySelector("[file-table]");

  if (fileTable) {
    const fileName = `<td class="p-[15px] border">${data.fileName}</td>`;
    const download = `
    <td class="p-[15px] border">
      <a href=${data.link} class="hover:text-[#4BA3E3]" download=${data.fileName}>Download</a>
    </td>`;

    const createdAt = `<td class="p-[15px] border">${data.createdAt}</td>`;

    const size = `<td class="p-[15px] border">${data.size}</td>`

    const seeders = `<td class="p-[15px] border" seeders> ${data.seeders.length} </td>`;

    row = `
      <tr file-id=${data.infoHash}>
        ${fileName}
        ${download}
        ${createdAt}
        ${size}
        ${seeders}
      </tr>
    `;

    fileTable.insertAdjacentHTML("beforeend", row);
  }
});
