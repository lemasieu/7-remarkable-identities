// Hàm xáo trộn mảng hiện đại (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Thay thế các ký tự đại diện {A} và {B}
function replaceAll(str, A, B) {
    return str.replace(/\{A\}/g, A).replace(/\{B\}/g, B);
}

// Xây dựng chuỗi đa thức dạng tổng từ mảng các hạng tử có kèm dấu sẵn
function buildSum(terms, A, B) {
    let processed = terms.map(t => replaceAll(t, A, B));
    shuffle(processed);
    let res = processed.join(" ").trim();
    // Nếu hạng tử nhảy lên đầu tiên mang dấu cộng, ta sẽ bỏ dấu đi cho đẹp
    if (res.startsWith("+ ")) {
        res = res.substring(2);
    }
    return res;
}

// Xây dựng chuỗi dạng tích (nối với nhau bằng dấu chấm)
function buildProduct(blocks, A, B) {
    let processed = blocks.map(b => replaceAll(b, A, B));
    shuffle(processed);
    return processed.join(".");
}

// Định nghĩa 7 hằng đẳng thức đáng nhớ 
const identities = [
    // 1. Bình phương của một tổng
    (A, B) => {
        const lhs = `({A} + {B})<sup>2</sup>`;
        const rhsTerms = [`+ {A}<sup>2</sup>`, `+ 2.{A}.{B}`, `+ {B}<sup>2</sup>`];
        const wrongRhs = [
            [`+ {A}<sup>2</sup>`, `- 2.{A}.{B}`, `+ {B}<sup>2</sup>`],
            [`+ {A}<sup>2</sup>`, `+ {B}<sup>2</sup>`],
            [`+ {A}<sup>2</sup>`, `+ 2.{A}.{B}`, `- {B}<sup>2</sup>`]
        ];
        const wrongLhs = [`({A} - {B})<sup>2</sup>`, `{A}<sup>2</sup> - {B}<sup>2</sup>`, `({A} + {B})<sup>3</sup>`];
        return {
            forward: () => ({ q: replaceAll(lhs, A, B), a: buildSum(rhsTerms, A, B), w: wrongRhs.map(t => buildSum(t, A, B)) }),
            backward: () => ({ q: buildSum(rhsTerms, A, B), a: replaceAll(lhs, A, B), w: wrongLhs.map(s => replaceAll(s, A, B)) })
        };
    },
    // 2. Bình phương của một hiệu
    (A, B) => {
        const lhs = `({A} - {B})<sup>2</sup>`;
        const rhsTerms = [`+ {A}<sup>2</sup>`, `- 2.{A}.{B}`, `+ {B}<sup>2</sup>`];
        const wrongRhs = [
            [`+ {A}<sup>2</sup>`, `+ 2.{A}.{B}`, `+ {B}<sup>2</sup>`],
            [`+ {A}<sup>2</sup>`, `- {B}<sup>2</sup>`],
            [`+ {A}<sup>2</sup>`, `- 2.{A}.{B}`, `- {B}<sup>2</sup>`]
        ];
        const wrongLhs = [`({A} + {B})<sup>2</sup>`, `{A}<sup>2</sup> + {B}<sup>2</sup>`, `({A} - {B})<sup>3</sup>`];
        return {
            forward: () => ({ q: replaceAll(lhs, A, B), a: buildSum(rhsTerms, A, B), w: wrongRhs.map(t => buildSum(t, A, B)) }),
            backward: () => ({ q: buildSum(rhsTerms, A, B), a: replaceAll(lhs, A, B), w: wrongLhs.map(s => replaceAll(s, A, B)) })
        };
    },
    // 3. Hiệu hai bình phương
    (A, B) => {
        const lhsTerms = [`+ {A}<sup>2</sup>`, `- {B}<sup>2</sup>`];
        const rhsBlocks = [`({A} - {B})`, `({A} + {B})`];
        const wrongRhs = [
            `({A} - {B}).({A} - {B})`,
            `({A} + {B}).({A} + {B})`,
            `({A}<sup>2</sup> - {B}<sup>2</sup>)<sup>2</sup>`
        ];
        const wrongLhs = [
            [`+ {A}<sup>2</sup>`, `+ {B}<sup>2</sup>`],
            [`+ ({A} - {B})<sup>2</sup>`],
            [`+ ({A} + {B})<sup>2</sup>`]
        ];
        return {
            forward: () => ({ q: buildSum(lhsTerms, A, B), a: buildProduct(rhsBlocks, A, B), w: wrongRhs.map(s => replaceAll(s, A, B)) }),
            backward: () => ({ q: buildProduct(rhsBlocks, A, B), a: buildSum(lhsTerms, A, B), w: wrongLhs.map(t => buildSum(t, A, B)) })
        };
    },
    // 4. Lập phương của một tổng
    (A, B) => {
        const lhs = `({A} + {B})<sup>3</sup>`;
        const rhsTerms = [`+ {A}<sup>3</sup>`, `+ 3.{A}<sup>2</sup>.{B}`, `+ 3.{A}.{B}<sup>2</sup>`, `+ {B}<sup>3</sup>`];
        const wrongRhs = [
            [`+ {A}<sup>3</sup>`, `- 3.{A}<sup>2</sup>.{B}`, `+ 3.{A}.{B}<sup>2</sup>`, `- {B}<sup>3</sup>`],
            [`+ {A}<sup>3</sup>`, `+ {B}<sup>3</sup>`],
            [`+ {A}<sup>3</sup>`, `+ 3.{A}.{B}`, `+ {B}<sup>3</sup>`]
        ];
        const wrongLhs = [`({A} - {B})<sup>3</sup>`, `{A}<sup>3</sup> + {B}<sup>3</sup>`, `({A} + {B})<sup>2</sup>`];
        return {
            forward: () => ({ q: replaceAll(lhs, A, B), a: buildSum(rhsTerms, A, B), w: wrongRhs.map(t => buildSum(t, A, B)) }),
            backward: () => ({ q: buildSum(rhsTerms, A, B), a: replaceAll(lhs, A, B), w: wrongLhs.map(s => replaceAll(s, A, B)) })
        };
    },
    // 5. Lập phương của một hiệu
    (A, B) => {
        const lhs = `({A} - {B})<sup>3</sup>`;
        const rhsTerms = [`+ {A}<sup>3</sup>`, `- 3.{A}<sup>2</sup>.{B}`, `+ 3.{A}.{B}<sup>2</sup>`, `- {B}<sup>3</sup>`];
        const wrongRhs = [
            [`+ {A}<sup>3</sup>`, `+ 3.{A}<sup>2</sup>.{B}`, `+ 3.{A}.{B}<sup>2</sup>`, `+ {B}<sup>3</sup>`],
            [`+ {A}<sup>3</sup>`, `- {B}<sup>3</sup>`],
            [`+ {A}<sup>3</sup>`, `- 3.{A}<sup>2</sup>.{B}`, `- 3.{A}.{B}<sup>2</sup>`, `- {B}<sup>3</sup>`]
        ];
        const wrongLhs = [`({A} + {B})<sup>3</sup>`, `{A}<sup>3</sup> - {B}<sup>3</sup>`, `({A} - {B})<sup>2</sup>`];
        return {
            forward: () => ({ q: replaceAll(lhs, A, B), a: buildSum(rhsTerms, A, B), w: wrongRhs.map(t => buildSum(t, A, B)) }),
            backward: () => ({ q: buildSum(rhsTerms, A, B), a: replaceAll(lhs, A, B), w: wrongLhs.map(s => replaceAll(s, A, B)) })
        };
    },
    // 6. Tổng hai lập phương
    (A, B) => {
        const lhsTerms = [`+ {A}<sup>3</sup>`, `+ {B}<sup>3</sup>`];
        const getRhs = () => {
            const f1 = `({A} + {B})`;
            const f2 = `(` + buildSum([`+ {A}<sup>2</sup>`, `- {A}.{B}`, `+ {B}<sup>2</sup>`], A, B) + `)`;
            return replaceAll(buildProduct([f1, f2], A, B), A, B); // SỬA TẠI ĐÂY: Thêm replaceAll
        };
        const getWrongRhs = () => {
            const w1 = `({A} - {B}).(` + buildSum([`+ {A}<sup>2</sup>`, `+ {A}.{B}`, `+ {B}<sup>2</sup>`], A, B) + `)`;
            const w2 = `({A} + {B}).(` + buildSum([`+ {A}<sup>2</sup>`, `+ {A}.{B}`, `+ {B}<sup>2</sup>`], A, B) + `)`;
            const w3 = `({A} + {B})<sup>3</sup>`;
            return [w1, w2, w3].map(w => replaceAll(w, A, B)); // SỬA TẠI ĐÂY: Duyệt qua mảng và replaceAll từng chuỗi
        };
        const wrongLhs = [[`+ {A}<sup>3</sup>`, `- {B}<sup>3</sup>`], [`+ ({A} + {B})<sup>3</sup>`], [`+ ({A} + {B})<sup>2</sup>`]];
        return {
            forward: () => ({ q: buildSum(lhsTerms, A, B), a: getRhs(), w: getWrongRhs() }),
            backward: () => ({ q: getRhs(), a: buildSum(lhsTerms, A, B), w: wrongLhs.map(t => buildSum(t, A, B)) })
        };
    },
    // 7. Hiệu hai lập phương
    (A, B) => {
        const lhsTerms = [`+ {A}<sup>3</sup>`, `- {B}<sup>3</sup>`];
        const getRhs = () => {
            const f1 = `({A} - {B})`;
            const f2 = `(` + buildSum([`+ {A}<sup>2</sup>`, `+ {A}.{B}`, `+ {B}<sup>2</sup>`], A, B) + `)`;
            return replaceAll(buildProduct([f1, f2], A, B), A, B); // SỬA TẠI ĐÂY: Thêm replaceAll
        };
        const getWrongRhs = () => {
            const w1 = `({A} + {B}).(` + buildSum([`+ {A}<sup>2</sup>`, `- {A}.{B}`, `+ {B}<sup>2</sup>`], A, B) + `)`;
            const w2 = `({A} - {B}).(` + buildSum([`+ {A}<sup>2</sup>`, `- {A}.{B}`, `+ {B}<sup>2</sup>`], A, B) + `)`;
            const w3 = `({A} - {B})<sup>3</sup>`;
            return [w1, w2, w3].map(w => replaceAll(w, A, B)); // SỬA TẠI ĐÂY: Duyệt qua mảng và replaceAll từng chuỗi
        };
        const wrongLhs = [[`+ {A}<sup>3</sup>`, `+ {B}<sup>3</sup>`], [`+ ({A} - {B})<sup>3</sup>`], [`+ ({A} - {B})<sup>2</sup>`]];
        return {
            forward: () => ({ q: buildSum(lhsTerms, A, B), a: getRhs(), w: getWrongRhs() }),
            backward: () => ({ q: getRhs(), a: buildSum(lhsTerms, A, B), w: wrongLhs.map(t => buildSum(t, A, B)) })
        };
    }
];

let correctQuestions = 0;
let totalQuestions = 0;

function initQuestion() {
    document.getElementById('next-btn').style.display = 'none';
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    // Lấy ngẫu nhiên hằng đẳng thức từ danh sách
    const randomIdentityFn = identities[Math.floor(Math.random() * identities.length)];
    
    // Tạo tập ký tự từ a-z và 0-9 để chọn ra đề ngẫu nhiên
    const pool = "abcdefghijklmnopqrstuvwxyz0123456789".split('');
    let A = pool[Math.floor(Math.random() * pool.length)];
    let B;
    do {
        B = pool[Math.floor(Math.random() * pool.length)];
    } while (A === B);

    // Sinh ngẫu nhiên chiều thuận hoặc nghịch
    const instance = randomIdentityFn(A, B);
    const direction = Math.floor(Math.random() * 2); 
    const data = (direction === 0) ? instance.forward() : instance.backward();

    document.getElementById('question').innerHTML = data.q + " = ?";

    // Trộn đáp án đúng và các đáp án nhiễu
    let allOptions = [
        { text: data.a, isCorrect: true },
        ...data.w.map(wText => ({ text: wText, isCorrect: false }))
    ];
    shuffle(allOptions);

    // Hiển thị các phương án lựa chọn
    allOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.innerHTML = opt.text;
        // Sử dụng thuộc tính dataset để check câu trả lời chuẩn xác 100%
        btn.dataset.isCorrect = opt.isCorrect;
        btn.onclick = () => checkAnswer(btn, opt.isCorrect);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedBtn, isCorrect) {
    const buttons = document.querySelectorAll('.option');
    buttons.forEach(btn => btn.disabled = true);

    totalQuestions++;

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        correctQuestions++;
    } else {
        selectedBtn.classList.add('wrong');
        // Cho hiển thị đáp án đúng nếu chọn sai
        buttons.forEach(btn => {
            if (btn.dataset.isCorrect === "true") {
                btn.classList.add('correct');
            }
        });
    }

    // Cập nhật thống kê tỉ lệ
    const percent = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;
    document.getElementById('stats').innerText = `Số câu đúng: ${correctQuestions}/${totalQuestions} (${percent}%)`;

    // Hiển thị nút "Câu tiếp theo" để tiếp tục kể cả khi sai
    document.getElementById('next-btn').style.display = 'inline-block';
}

window.onload = () => {
    initQuestion();
    document.getElementById('next-btn').onclick = initQuestion;
};